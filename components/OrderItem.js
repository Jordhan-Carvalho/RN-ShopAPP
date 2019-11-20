import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Card from "./Card";
import CartItem from "./CartItem";
import Colors from "../constants/Colors";

const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.container}>
      <View style={styles.summary}>
        <Text>${order.totalAmount.toFixed(2)}</Text>
        <Text>
          {order.date.toLocaleDateString("en-EN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails(prevState => !prevState)}
      />
      {showDetails && (
        <View style={styles.detailContainer}>
          {order.items.map((cartItem, i) => (
            <CartItem key={i} product={cartItem} />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
    alignItems: "center"
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15
  },
  detailContainer: {
    width: "100%"
  }
});

export default OrderItem;
