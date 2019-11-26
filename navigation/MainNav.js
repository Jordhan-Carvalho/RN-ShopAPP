import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import MainScreen from "../screens/MainScreen";
import Detail from "../screens/Detail";
import Cart from "../screens/Cart";
import Orders from "../screens/Orders";
import ManageProducts from "../screens/ManageProducts";
import EditProduct from "../screens/EditProduct";
import LoginScreen from "../screens/LoginScreen";
import StartupScreen from "../screens/StartupScreen";
import { logout } from "../store/actions/auth";

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
    drawerWidth: "50%",
    //add more buttons / react comp => can be created in another flder
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(logout());
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavStack = createStackNavigator(
  {
    Auth: LoginScreen
  },
  defaultNavStackOptions
);

const MainSwitchNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavStack,
  Main: MainNavDrawer
});

export default createAppContainer(MainSwitchNavigator);
