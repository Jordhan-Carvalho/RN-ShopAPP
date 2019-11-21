import React from "react";
import { StyleSheet, FlatList, Platform, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";
import ItemCard from "../components/ItemCard";
import Colors from "../constants/Colors";
import { deleteItem } from "../store/actions/items";

const ManageProducts = ({ navigation }) => {
  const userProducts = useSelector(state => state.itemsReducer.userProducts);
  const dispatch = useDispatch();

  const deleteHanlder = id => {
    Alert.alert("Are you sure?", "Deleting can not be reversed", [
      {
        text: "Yes",
        onPress: () => dispatch(deleteItem(id)),
        style: "destructive"
      },
      { text: "No", style: "cancel" }
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ItemCard
          navigation={navigation}
          itemInfo={itemData.item}
          onSelect={() =>
            navigation.navigate("EditProduct", { prod: itemData.item })
          }
        >
          <Button
            title="Edit"
            color={Colors.primary}
            onPress={() =>
              navigation.navigate("EditProduct", { prod: itemData.item })
            }
          />
          <Button
            title="Delete"
            color={Colors.primary}
            onPress={() => deleteHanlder(itemData.item.id)}
          />
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
