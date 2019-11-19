import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import ItemCard from "../components/ItemCard";

const MainScreen = ({ navigation }) => {
  const availableItems = useSelector(state => state.itemsReducer.items);

  const renderFlatItems = itemData => {
    return <ItemCard itemInfo={itemData.item} navigation={navigation} />;
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
          iconName="ios-cart"
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default MainScreen;
