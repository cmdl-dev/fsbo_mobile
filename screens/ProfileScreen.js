import React, { useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";

import { connect } from "react-redux";
import { removeUserToken } from "../actions";

function ProfileScreen({ navigation, token, removeUserToken }) {
  const [error, setError] = useState(null);

  const _signOutAsync = () => {
    removeUserToken()
      .then(() => {
        navigation.navigate("Auth");
      })
      .catch(error => {
        setError(error);
      });
  };
  return (
    <View style={styles.container}>
      {token ? (
        <Text> Hello, {token.firstName}</Text>
      ) : (
        <Text>Please sign in</Text>
      )}
      <Button title="I'm done, sign me out" onPress={_signOutAsync} />
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

const mapStateToProps = state => {
  console.log(state);
  return {
    token: state.token.token
  };
};

const mapDispatchToProps = dispatch => ({
  removeUserToken: () => dispatch(removeUserToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
