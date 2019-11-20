import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { removeCart } from "../store/actions/cart";

const CartItem = ({ product, deletable }) => {
  const dispatch = useDispatch();

  let TouchButton = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchButton = TouchableNativeFeedback;
  }

  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.itemData}>
        <Text style={styles.qty}>{product.quantity}</Text>
        <Text style={styles.title}>{product.title}</Text>
      </View>

      <View style={styles.itemData}>
        <Text style={styles.title}>${product.sum.toFixed(2)}</Text>
        {deletable && (
          <TouchButton
            onPress={() => dispatch(removeCart(product.id))}
            style={styles.deleteButton}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          </TouchButton>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center"
  },
  qty: {
    color: "#888",
    fontSize: 16
  },
  title: {
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  }
});

export default CartItem;
