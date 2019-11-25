import React, { useCallback, useReducer, useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import { signup, signIn } from "../store/actions/auth";
import Input from "../components/Input";
import Card from "../components/Card";
import Colors from "../constants/Colors";

const formReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FORM_INPUT_UPDATE":
      const updatedValues = {
        ...state.inputValue,
        [payload.input]: payload.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [payload.input]: payload.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }

      return {
        ...state,
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValue: updatedValues
      };

    default:
      return state;
  }
};

const LoginScreen = ({ navigation }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchReducer] = useReducer(formReducer, {
    inputValue: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  //There are libraries to validate like Validate.js
  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      dispatchReducer({
        type: "FORM_INPUT_UPDATE",
        payload: { value: inputValue, isValid: inputValidity, input: inputId }
      });
    },
    [dispatchReducer]
  );

  const authHandler = async () => {
    const { email, password } = formState.inputValue;
    setIsLoading(true);
    setError(null);
    try {
      if (isSignup) {
        await dispatch(signup(email, password));
      } else {
        await dispatch(signIn(email, password));
        navigation.navigate("Main");
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

LoginScreen.navigationOptions = {
  headerTitle: "Please login"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default LoginScreen;
