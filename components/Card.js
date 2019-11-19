import React from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

// Shadow for iOS elevation for android
const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 5,
    paddingBottom: 20,
    borderRadius: 10
  }
});

export default Card;
