import React, { useReducer, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const inputReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        value: payload.value,
        isValid: payload.isValid
      };
    case "INPUT_BLUR":
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const initialState = {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false
  };
  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);

  const { onInputChange, id } = props;

  useEffect(() => {
    // if (inputState.touched) {  ** removed because it caused a bug on edit (had to click done or outside the keyboard to the edit make effect onBLur)
    onInputChange(id, inputState.value, inputState.isValid);
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatchInput({ type: "INPUT_CHANGE", payload: { value: text, isValid } });
  };

  const lostFocusHandler = () => {
    dispatchInput({ type: "INPUT_BLUR" });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        // text is sent by react native as last argument
        onChangeText={text => textChangeHandler(text)}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%"
  },
  label: {
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  errorContainer: {
    margin: 5
  },
  errorText: {
    color: "red",
    fontSize: 13
  }
});

export default Input;
