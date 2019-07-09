import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { saveUserToken } from "../actions";

function LoginScreen({ navigation, saveUserToken }) {
  const [error, setError] = useState(null);

  const _signInAsync = () => {
    saveUserToken()
      .then(() => {
        navigation.navigate("App");
      })
      .catch(error => {
        setError(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text>This is the login screen</Text>
      <Button title="Sign in" onPress={_signInAsync} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  saveUserToken: () => dispatch(saveUserToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
