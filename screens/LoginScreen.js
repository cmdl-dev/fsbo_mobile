import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { BASE_URL } from "../config/config";
import { saveUserToken } from "../actions";

function LoginScreen({ navigation, saveUserToken }) {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _signInAsync = () => {
    const GET_USER = `
      query getUser($email: String!, $password: String!){
        user(email: $email, password: $password){
          email
          firstName
          lastName
          token
        }
      }
    `;
    console.log(GET_USER);
    const options = {
      method: "post",
      body: JSON.stringify({
        query: GET_USER,
        variables: { email, password }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(`${BASE_URL}:3000/graphql`, options)
      .then(response => response.json())
      .then(({ errors, data }) => {
        if (!errors) {
          saveUserToken(JSON.stringify(data.user))
            .then(() => {
              navigation.navigate("App");
            })
            .catch(error => {
              setError(error);
            });
        } else {
          setError(errors);
        }
      });
  };
  const displayErrors = () => {
    return error.map((error, idx) => {
      return <Text key={idx}>{error.message}</Text>;
    });
  };
  return (
    <View style={styles.container}>
      <Text>This is the login screen</Text>
      {error ? displayErrors() : <Text />}
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
    borderColor: "black",
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
