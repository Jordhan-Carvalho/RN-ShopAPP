import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform
} from "react-native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";
import { createItem, updateItem } from "../store/actions/items";

const EditProducts = ({ navigation }) => {
  const prod = navigation.getParam("prod");

  const [title, setTitle] = useState(prod ? prod.title : "");
  const [imageURL, setImageURL] = useState(prod ? prod.imageUrl : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(prod ? prod.description : "");

  const dispatch = useDispatch();

  // send a function to params, useEffect auseCallback
  const submitHandler = useCallback(() => {
    if (prod) {
      const produc = {
        title,
        imageUrl: imageURL,
        description
      };
      dispatch(updateItem(produc, prod.id));
    } else {
      const produc = {
        title,
        imageUrl: imageURL,
        price: parseFloat(price),
        description
      };
      dispatch(createItem(produc));
    }
    console.log("submited");
    navigation.goBack();
  }, [dispatch, prod, title, imageURL, description, price]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageURL}
            onChangeText={text => setImageURL(text)}
          />
        </View>
        {!prod && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
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
  },
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
  }
});

export default EditProducts;
