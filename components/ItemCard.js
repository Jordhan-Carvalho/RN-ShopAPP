import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

import Card from "./Card";

const ItemCard = ({ itemInfo, onSelect, children }) => {
  let TouchButton = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchButton = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.cardContainer}>
      <TouchButton
        // Effect on the photo
        useForeground
        onPress={onSelect}
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
        <View style={styles.cardContent}>{children}</View>
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
