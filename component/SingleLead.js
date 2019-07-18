import React from "react";
import {
  AsyncStorage,
  Button,
  StatusBar,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

const SingleLead = ({ leadInfo }) => {
  const leadXPos = new Animated.Value(0);
  const leadPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      const width = Dimensions.get("window").width;
      console.log(width, gs.dx);
      leadXPos.setValue(gs.dx);
    },
    onPanResponderEnd: (evt, gs) => {
      const width = Dimensions.get("window").width;
      if (gs.dx < -1 * width * 0.4 || gs.dx > width * 0.4) {
        const swipeDirection = gs.dx < -1 * width * 0.4 ? "left" : "right";
        //Swipe left
        Animated.timing(leadXPos, {
          toValue: swipeDirection === "left" ? -1 * width : 1 * width,
          duration: 250
        }).start();
        console.log("ENDED");
      } else {
        Animated.timing(leadXPos, {
          toValue: 0,
          duration: 250
        }).start();
      }
    }
  });
  const _handleCall = () => {
    console.log("You are calling someone");
  };
  return (
    <Animated.View
      {...leadPanResponder.panHandlers}
      style={[styles.container, { left: leadXPos }]}
    >
      <View style={styles.userInfo}>
        <Text>{leadInfo.firstName}</Text>
        <Text>{leadInfo.lastName}</Text>
      </View>
      <TouchableOpacity onPress={_handleCall} style={styles.contactInfo}>
        <Text>{leadInfo.phone}</Text>
        <Icon style={styles.phone} name="phone" size={30} color="#900" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    borderColor: "black",
    borderWidth: "2px",
    padding: "10px",
    justifyContent: "space-between",
    width: "100%",
    height: "75px"
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
export default SingleLead;
