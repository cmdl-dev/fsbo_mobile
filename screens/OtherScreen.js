import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function OtherScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Other screen</Text>
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
