import React, { useState } from "react";
import { useScreens } from "react-native-screens";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import MainNav from "./navigation/MainNav";

//redux
import store from "./store/store";
import { Provider } from "react-redux";
//Increase performance
useScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "odibee-sans": require("./assets/Fonts/OdibeeSans-Regular.ttf")
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainNav />
    </Provider>
  );
}
