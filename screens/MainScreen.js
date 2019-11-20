import React from "react";
import { StyleSheet, FlatList, Platform, Button, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import ItemCard from "../components/ItemCard";
import { addCart } from "../store/actions/cart";
import Colors from "../constants/Colors";

const MainScreen = ({ navigation }) => {
  const availableItems = useSelector(state => state.itemsReducer.items);
  const dispatch = useDispatch();

  const renderFlatItems = itemData => {
    return (
      <ItemCard
        itemInfo={itemData.item}
        navigation={navigation}
        onSelect={() => navigation.navigate("Detail", { item: itemData.item })}
      >
        <Button
          title="Detail"
          color={Colors.primary}
          onPress={() => navigation.navigate("Detail", { item: itemData.item })}
        />
        <Text style={{ color: "grey" }}>
          R$ {itemData.item.price.toFixed(2)}
        </Text>
        <Button
          title="Cart"
          color={Colors.primary}
          onPress={() => dispatch(addCart(itemData.item))}
        />
      </ItemCard>
    );
  };

  return (
    <FlatList
      style={{ width: "100%" }}
      keyExtractor={(item, index) => item.id}
      data={availableItems}
      renderItem={renderFlatItems}
    />
  );
};

MainScreen.navigationOptions = navData => {
  return {
    headerTitle: "All products",
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
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default MainScreen;
