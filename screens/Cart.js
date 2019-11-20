import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useDispatch } from "react-redux";

import { addOrder } from "../store/actions/orders";
import CartItem from "../components/CartItem";
import Card from "../components/Card";
import Colors from "../constants/Colors";

const Cart = ({ navigation }) => {
  const itemsCart = useSelector(state => state.cartReducer.cart);
  const totalSum = useSelector(state => state.cartReducer.totalAmount);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Card style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalSum.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.secondary}
          disabled={itemsCart.length === 0}
          onPress={() => dispatch(addOrder(itemsCart, totalSum))}
        />
      </Card>
      <FlatList
        keyExtractor={item => item.id}
        data={itemsCart}
        renderItem={itemData => <CartItem product={itemData.item} deletable />}
      />
    </View>
  );
};

Cart.navigationOptions = {
  headerTitle: "Cart"
};

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10
  },
  summaryText: {
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default Cart;
