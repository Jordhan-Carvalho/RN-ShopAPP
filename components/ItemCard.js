import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import { useDispatch } from "react-redux";

import { addCart } from "../store/actions/cart";
import Card from "./Card";
import Colors from "../constants/Colors";

const ItemCard = ({ navigation, itemInfo }) => {
  const dispatch = useDispatch();

  const addToCart = useCallback(() => {
    dispatch(addCart(itemInfo));
    navigation.navigate("Cart");
  }, [dispatch, itemInfo]);

  let TouchButton = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchButton = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.cardContainer}>
      <TouchButton
        // Effect on the photo
        useForeground
        onPress={() => navigation.navigate("Detail", { item: itemInfo })}
      >
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={{
              uri: itemInfo.imageUrl
            }}
          />
        </View>
      </TouchButton>
      <View style={styles.cardContentContainer}>
        <Text style={{ textAlign: "center" }}>{itemInfo.title}</Text>
        <View style={styles.cardContent}>
          <Button
            title="Detail"
            color={Colors.primary}
            onPress={() => navigation.navigate("Detail", { item: itemInfo })}
          />
          <Text style={{ color: "grey" }}>R$ {itemInfo.price.toFixed(2)}</Text>
          <Button title="Cart" color={Colors.primary} onPress={addToCart} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 250,
    margin: 20
  },
  image: {
    width: "100%",
    height: "100%"
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  cardContentContainer: {
    height: "30%",
    padding: 10
  },
  imgContainer: {
    width: "100%",
    height: "70%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden"
  }
});

export default ItemCard;
