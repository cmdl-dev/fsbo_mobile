import React from "react";
// import { StyleSheet, Text, View, Button } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import OtherScreen from "./screens/OtherScreen";
import CustomHeader from "./component/CustomHeader";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
/**
 * A home landing page
 * We need a login screen
 * A way to see the information
 *  A way for the user to organize the information
 *  A feature that automatically organizes the information
 *    Phase 1, Phase 2, Phase 3, Archive
 *    Ability to add notes for their leeds
 * A way to restrict the user from actually entering the application with out an active membership
 * A way to buy an active membership
 * A way for the user to buy "Our currency" then to buy stuff on the application
 */
let headerDefaultNavigationConfig = {
  header: props => <CustomHeader {...props} />,
  headerStyle: {
    backgroundColor: "transparent"
  },
  headerTitleStlye: {
    fontWeight: "bold",
    color: "#fff",
    zIndex: 1,
    fontSize: 18,
    lineHeight: 23
  },
  headerTintColor: "#fff"
};

export const AppStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Home Screen"
      }
    },
    Other: {
      screen: OtherScreen,
      navigationOptions: {
        headerTitle: "Other screen"
      }
    }
  },
  {
    navigationOptions: {
      ...headerDefaultNavigationConfig
    }
  }
);

export const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: LoginScreen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Login Screen"
      }
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Register Screen"
      }
    }
  },
  {
    navigationOptions: {
      ...headerDefaultNavigationConfig
    }
  }
);

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export const AppContainer = createAppContainer(AppNavigator);
