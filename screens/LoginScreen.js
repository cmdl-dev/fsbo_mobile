import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { saveUserToken } from "../actions";

function LoginScreen({ navigation, saveUserToken }) {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _signInAsync = () => {
    console.log(email, password);
    // fetch("http://192.168.1.3:3000/api/v1/test")
    //   .then(response => response.json())
    //   .then(data => {
    //     saveUserToken(JSON.stringify(data))
    //       .then(() => {
    //         navigation.navigate("App");
    //       })
    //       .catch(error => {
    //         setError(error);
    //       });
    //   });
  };
  return (
    <View style={styles.container}>
      <Text>This is the login screen</Text>
      <TextInput
        value={email}
        onChangeText={currentEmail => setEmail(currentEmail)}
        style={styles.input}
        placeholder={"Email"}
      />
      <TextInput
        value={password}
        onChangeText={currentPassword => setPassword(currentPassword)}
        secureTextEntry={true}
        style={styles.input}
        placeholder={"Password"}
      />
      <Button title="Sign in" onPress={_signInAsync} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderCoLor: "black",
    marginBottom: 10
  }
});

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  saveUserToken: params => dispatch(saveUserToken(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
