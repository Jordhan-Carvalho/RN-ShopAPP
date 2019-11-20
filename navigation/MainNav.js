import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import MainScreen from "../screens/MainScreen";
import Detail from "../screens/Detail";
import Cart from "../screens/Cart";
import Orders from "../screens/Orders";
import ManageProducts from "../screens/ManageProducts";
import EditProduct from "../screens/EditProduct";

const defaultNavStackOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : ""
    },
    headerTitleStyle: {
      fontFamily: "odibee-sans"
    },
    headerBackTitleStyle: {
      fontFamily: "odibee-sans"
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    headerTitle: "Shop App"
  }
};

const MainNavStack = createStackNavigator(
  { MainScreen, Detail, Cart },
  defaultNavStackOptions
);

const OrdersNavStack = createStackNavigator(
  {
    Orders
  },
  defaultNavStackOptions
);

const ManageProdNavStack = createStackNavigator(
  { ManageProducts, EditProduct },
  defaultNavStackOptions
);

const MainNavDrawer = createDrawerNavigator(
  {
    Main: {
      screen: MainNavStack,
      navigationOptions: {
        drawerLabel: "Shop",
        drawerIcon: drwConfig => (
          <Ionicons
            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            size={23}
            color={drwConfig.tintColor}
          />
        )
      }
    },
    Orders: {
      screen: OrdersNavStack,
      navigationOptions: {
        drawerLabel: "Orders",
        drawerIcon: drwConfig => (
          <Ionicons
            name={Platform.OS === "android" ? "md-list" : "ios-list"}
            size={23}
            color={drwConfig.tintColor}
          />
        )
      }
    },
    ManageProducts: {
      screen: ManageProdNavStack,
      navigationOptions: {
        drawerLabel: "Admin",
        drawerIcon: drwConfig => (
          <Ionicons
            name={Platform.OS === "android" ? "md-create" : "ios-create"}
            size={23}
            color={drwConfig.tintColor}
          />
        )
      }
    }
  },
  {
    contentOptions: {
      inactiveTintColor: "white",
      activeTintColor: Colors.secondary
      //   labelStyle: { fontFamily: "odibee-sans", color: "white" }
    },
    drawerBackgroundColor: Colors.primary,
    drawerWidth: "50%"
  }
);

export default createAppContainer(MainNavDrawer);
