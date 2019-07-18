import React, { useState } from "react";
import {
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

import { connect } from "react-redux";
import { removeUserToken } from "../actions";

function Phase2Screen({ navigation, user }) {
  const [error, setError] = useState(null);

  return (
    <View style={styles.container}>
      <Text>This is the screen for phase 2</Text>
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
  return {
    user: state.token.token
  };
};

const mapDispatchToProps = dispatch => ({
  removeUserToken: () => dispatch(removeUserToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Phase2Screen);
