import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

const Cart = ({ navigation }) => {
  const itemsCart = useSelector(state => state.cartReducer.cart);

  if (itemsCart.length === 0 || !itemsCart) {
    return (
      <View style={styles.container}>
        <Text>No items on cart</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Total sum:</Text>
      {itemsCart.map((item, i) => (
        <Text key={i}>{item.price}</Text>
      ))}
    </View>
  );
};

Cart.navigationOptions = {
  headerTitle: "Cart"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

export default Cart;
