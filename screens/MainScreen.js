import React, { useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  View,
  Text
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import ItemCard from "../components/ItemCard";
import { addCart } from "../store/actions/cart";
import { getItems } from "../store/actions/items";
import Colors from "../constants/Colors";

const MainScreen = ({ navigation }) => {
  const { items: availableItems, loading: isLoading, error } = useSelector(
    state => state.itemsReducer
  );
  const dispatch = useDispatch();

  // When you change screens using drawer (stack works fine) it doenst rerender(useEffect), so you have to add a listener
  useEffect(() => {
    const willFocusSub = navigation.addListener("willFocus", () => {
      dispatch(getItems());
    });
    return () => {
      willFocusSub.remove();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

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
        <Button
          title="Cart"
          color={Colors.primary}
          onPress={() => dispatch(addCart(itemData.item))}
        />
      </ItemCard>
    );
  };

  if (!isLoading && error.message) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred, restart your app</Text>
        {/* Only works if using local loadin in useState (make a fn that changess the state after and before dispatch) */}
        <Button
          title="Refresh"
          onPress={() => dispatch(getItems())}
          color={Colors.primary}
        />
      </View>
    );
  }

  return (
    <>
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : availableItems.length === 0 ? (
        <View style={styles.centered}>
          <Text>No products found. Add some</Text>
        </View>
      ) : (
        <FlatList
          onRefresh={() => dispatch(getItems())}
          refreshing={isLoading}
          style={{ width: "100%" }}
          keyExtractor={(item, index) => item.id}
          data={availableItems}
          renderItem={renderFlatItems}
        />
      )}
    </>
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default MainScreen;
