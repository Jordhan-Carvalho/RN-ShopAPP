import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Platform,
  Button,
  Alert,
  ActivityIndicator,
  Text
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";
import ItemCard from "../components/ItemCard";
import Colors from "../constants/Colors";
import { deleteItem } from "../store/actions/items";

const ManageProducts = ({ navigation }) => {
  const userProducts = useSelector(state => state.itemsReducer.userProducts);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const deleteHanlder = id => {
    const newDispatch = async id => {
      setIsLoading(true);
      try {
        await dispatch(deleteItem(id));
      } catch (error) {
        setError(error.message);
        Alert.alert("Error", error.message);
      }
      setIsLoading(false);
    };

    Alert.alert("Are you sure?", "Deleting can not be reversed", [
      {
        text: "Yes",
        onPress: () => newDispatch(id),
        style: "destructive"
      },
      { text: "No", style: "cancel" }
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>You have no registered products</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ManageProducts;
