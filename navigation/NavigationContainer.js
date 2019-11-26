// added to listen for AUTOMATIC LOGOUT and navigate out, have access to redux
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import MainNav from "./MainNav";

const NavigationContainer = () => {
  const isAuth = useSelector(state => !!state.authReducer.token);
  const navRef = useRef();

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <MainNav ref={navRef} />;
};

export default NavigationContainer;
