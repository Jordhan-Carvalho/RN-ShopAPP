import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Input from "../components/Input";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { createItem, updateItem } from "../store/actions/items";

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

const EditProducts = ({ navigation }) => {
  const prod = navigation.getParam("prod");
  const dispatch = useDispatch();
  // use when a lot of individual state
  const initialState = {
    inputValue: {
      title: prod ? prod.title : "",
      imageUrl: prod ? prod.imageUrl : "",
      price: "",
      description: prod ? prod.description : ""
    },
    inputValidities: {
      title: prod ? true : false,
      imageUrl: prod ? true : false,
      price: prod ? true : false,
      description: prod ? true : false
    },
    formIsValid: prod ? true : false
  };
  const [formState, dispatchReducer] = useReducer(formReducer, initialState);

  // const [title, setTitle] = useState(prod ? prod.title : "");
  // const [titleValid, setTitleValid] = useState(false);
  // const [imageURL, setImageURL] = useState(prod ? prod.imageUrl : "");
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState(prod ? prod.description : "");

  // send a function to params, useEffect auseCallback
  const submitHandler = useCallback(() => {
    //check validations
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "Please check the errors in the form", [
        { text: "Ok" }
      ]);
      return;
    }

    if (prod) {
      const produc = {
        title: formState.inputValue.title,
        imageUrl: formState.inputValue.imageUrl,
        description: formState.inputValue.description
      };
      dispatch(updateItem(produc, prod.id));
    } else {
      const produc = {
        title: formState.inputValue.title,
        imageUrl: formState.inputValue.imageUrl,
        price: parseFloat(formState.inputValue.price),
        description: formState.inputValue.description
      };
      dispatch(createItem(produc));
    }
    navigation.goBack();
  }, [dispatch, prod, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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

  return (
    <KeyboardAvoidingView
      // Super important flex 1 otherwise it wont work
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={prod ? prod.title : ""}
            initiallyValid={!!prod}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            onInputChange={inputChangeHandler}
            initialValue={prod ? prod.imageUrl : ""}
            initiallyValid={!!prod}
            required
          />
          {!prod && (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              onInputChange={inputChangeHandler}
              required
              min={1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLine={3}
            onInputChange={inputChangeHandler}
            initialValue={prod ? prod.description : ""}
            initiallyValid={!!prod}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProducts.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam("submit");

  return {
    headerTitle: navData.navigation.getParam("prod")
      ? "Edit Product"
      : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  }
});

export default EditProducts;
