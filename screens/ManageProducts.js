import React from "react";
import { StyleSheet, FlatList, Platform, Button, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";
import ItemCard from "../components/ItemCard";
import Colors from "../constants/Colors";

const ManageProducts = ({ navigation }) => {
  const userProducts = useSelector(state => state.itemsReducer.userProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ItemCard
          navigation={navigation}
          itemInfo={itemData.item}
          onSelect={() => {}}
        >
          <Button title="Edit" color={Colors.primary} onPress={() => {}} />
          <Text style={{ color: "grey" }}>
            R$ {itemData.item.price.toFixed(2)}
          </Text>
          <Button title="Delete" color={Colors.primary} onPress={() => {}} />
        </ItemCard>
      )}
    />
  );
};

ManageProducts.navigationOptions = navData => {
  return {
    headerTitle: "Your products",
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
          title="Create"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default ManageProducts;
