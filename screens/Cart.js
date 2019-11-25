import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";
import { useDispatch } from "react-redux";

import { addOrder } from "../store/actions/orders";
import CartItem from "../components/CartItem";
import Card from "../components/Card";
import Colors from "../constants/Colors";

const Cart = () => {
  const itemsCart = useSelector(state => state.cartReducer.cart);
  const totalSum = useSelector(state => state.cartReducer.totalAmount);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const sendOrder = async () => {
    setIsLoading(true);
    try {
      await dispatch(addOrder(itemsCart, totalSum));
    } catch (error) {
      Alert.alert("Error", error.message);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(totalSum.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Button
            title="Order Now"
            color={Colors.secondary}
            disabled={itemsCart.length === 0}
            onPress={sendOrder}
          />
        )}
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
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Cart;
