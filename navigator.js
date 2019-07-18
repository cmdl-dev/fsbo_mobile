import React from "react";
// import { StyleSheet, Text, View, Button } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import CustomHeader from "./component/CustomHeader";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import ProfileScreen from "./screens/ProfileScreen";

import Phase1Screen from "./screens/Phase1Screen";
import Phase2Screen from "./screens/Phase2Screen";
import Phase3Screen from "./screens/Phase3Screen";
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
//TODO: Remove Otherscreen
/**
 *
 * Each phase determines where that lead is in for each user
 *
 * Screen 1: Phase 1
 * Screen 2: Phase 2
 * Screen 3: Phase 3
 */
export const AppStack = createBottomTabNavigator(
  {
    Phase1: {
      screen: Phase1Screen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Phase 1 Screen"
      }
    },
    Phase2: {
      screen: Phase2Screen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Phase 2 Screen"
      }
    },
    Phase3: {
      screen: Phase3Screen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Phase 3 Screen"
      }
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Profile Screen"
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
