import React from "react";
import { Header } from "react-navigation";
import { View, Platform } from "react-native";

export default function CustomHeader(props) {
  return (
    <View style={{ height: 56, marginTop: Platform.os === "ios" ? 20 : 0 }}>
      <Header {...props} />
    </View>
  );
}
