import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button
} from "react-native";
import { useDispatch } from "react-redux";
import { addCart } from "../store/actions/cart";

import Colors from "../constants/Colors";

const Detail = ({ navigation }) => {
  const item = navigation.getParam("item");
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.img} source={{ uri: item.imageUrl }} />
      <Button
        title="ADD To Cart"
        onPress={() => dispatch(addCart(item))}
        color={Colors.primary}
      />
      <View style={styles.text}>
        <Text style={{ color: "grey", marginVertical: 20, fontSize: 18 }}>
          R$ {item.price.toFixed(2)}
        </Text>

        <Text style={{ textAlign: "center" }}>{item.description}</Text>
      </View>
    </ScrollView>
  );
};

Detail.navigationOptions = navData => {
  const { title } = navData.navigation.getParam("item");
  return {
    headerTitle: title
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  img: {
    width: "100%",
    height: 300
  },
  text: {
    padding: 20,
    alignItems: "center"
  }
});

export default Detail;
