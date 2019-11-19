import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";

import Colors from "../constants/Colors";
import MainScreen from "../screens/MainScreen";
import Detail from "../screens/Detail";
import Cart from "../screens/Cart";
import Orders from "../screens/Orders";
import ManageProducts from "../screens/ManageProducts";

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

const MainNavDrawer = createDrawerNavigator(
  {
    Main: { screen: MainNavStack, navigationOptions: { drawerLabel: "Shop" } },
    Orders,
    ManageProducts
  },
  {
    contentOptions: {
      activeLabelStyle: { color: Colors.secondary },
      labelStyle: { fontFamily: "odibee-sans", color: "white" }
    },
    drawerBackgroundColor: Colors.primary,
    drawerWidth: "35%"
  }
);

export default createAppContainer(MainNavDrawer);
