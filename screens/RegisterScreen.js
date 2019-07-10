import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { saveUserToken } from "../actions";

function RegisterScreen({ navigation, saveUserToken }) {
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const _registerAsync = () => {
    const ADD_USER = `
        mutation{
            AddUser(firstName: "${firstName}" lastName: "${lastName}" email: "${email}" password: "${password}"){
                firstName
                lastName
                email
                token
            }
        }
    `;
    const options = {
      method: "post",
      body: JSON.stringify({ query: ADD_USER }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("http://192.168.1.3:3000/graphql", options)
      .then(response => response.json())
      .then(({ data }) => {
        saveUserToken(JSON.stringify(data.AddUser))
          .then(() => {
            navigation.navigate("App");
          })
          .catch(error => {
            setError(error);
          });
      });
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
      <Text>Register</Text>
      {error ? <Text>Error is {error}</Text> : <Text />}
      <TextInput
        value={firstName}
        onChangeText={currentFirstName => setFirstName(currentFirstName)}
        style={styles.input}
        placeholder={"First Name"}
      />
      <TextInput
        value={lastName}
        onChangeText={currentLastName => setLastName(currentLastName)}
        style={styles.input}
        placeholder={"Last Name"}
      />
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
      <TextInput
        value={confirmPassword}
        onChangeText={currentConfirmPassword =>
          setConfirmPassword(currentConfirmPassword)
        }
        secureTextEntry={true}
        style={styles.input}
        placeholder={"Confirm Password"}
      />
      <Text>
        {password === confirmPassword
          ? "Your passwords match"
          : "Your passwords do not match"}
      </Text>
      <Button title="Register" onPress={_registerAsync} />
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
)(RegisterScreen);
