import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AsyncStore,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

import { connect } from "react-redux";
import { getUserToken } from "../actions";
/**
 *  This is the first place that is going to be loaded.
 *  If the person is has the token then go the home poge
 *  Otherwise it will take you to login
 */
const AuthLoadingScreen = ({ getUserToken, token, navigation }) => {
  const [error, setError] = useState(null);
  useEffect(() => {
    _bootstrapAsync();
  }, []);

  const _bootstrapAsync = () => {
    getUserToken()
      .then(() => {
        navigation.navigate(Object.keys(token).length !== 0 ? "App" : "Auth");
      })
      .catch(error => {
        setError(error);
      });
  };
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  token: state.token.token
});

const mapDispatchToProps = dispatch => ({
  getUserToken: () => dispatch(getUserToken())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
