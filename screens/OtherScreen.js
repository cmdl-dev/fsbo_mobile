import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";

function OtherScreen({ navigation, token }) {
  return (
    <View style={styles.container}>
      <Text>
        Other screen{token.type} {token.token}
      </Text>
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
    token: state.token.token
  };
};

export default connect(mapStateToProps)(OtherScreen);
