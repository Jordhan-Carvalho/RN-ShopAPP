import React from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";
import OrderItem from "../components/OrderItem";

const Orders = () => {
  const orders = useSelector(state => state.orderReducer.orders);
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <OrderItem order={itemData.item} />}
    />
  );
};

Orders.navigationOptions = navData => {
  return {
    headerTitle: "All Orders",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default Orders;
