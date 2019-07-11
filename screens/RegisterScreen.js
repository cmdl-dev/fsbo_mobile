import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";

import { BASE_URL } from "../config/config";
import { saveUserToken } from "../actions";

// TODO: Add input validation for each text input
function RegisterScreen({ navigation, saveUserToken }) {
  const [error, setError] = useState([]);
  const [errorFields, setErrorFields] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const _checkVadility = () => {
    // Make sure that each input has the correct information
    // call registerAsync
    if (
      password.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      password === confirmPassword
    ) {
      _registerAsync();
    } else {
      const currentErrorFields = [];
      if (password.length === 0) {
        currentErrorFields.push("password");
      }
      if (firstName.length === 0) {
        currentErrorFields.push("firstName");
      }
      if (lastName.length === 0) {
        currentErrorFields.push("lastName");
      }
      if (email.length === 0) {
        currentErrorFields.push("email");
      }
      if (password !== confirmPassword) {
        currentErrorFields.push("no match");
      }
      setErrorFields(currentErrorFields);
    }
  };
  const _registerAsync = () => {
    console.log("submittting");
    const ADD_USER = `
        mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, ){
            AddUser(firstName: $firstName lastName: $lastName email: $email password: $password){
                firstName
                lastName
                email
                token
            }
        }
    `;
    const options = {
      method: "post",
      body: JSON.stringify({
        query: ADD_USER,
        variables: {
          firstName: firstName.length > 0 ? firstName : undefined,
          lastName: lastName.length > 0 ? lastName : undefined,
          email: email.length > 0 ? email : undefined,
          password: password.length > 0 ? password : undefined
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(`${BASE_URL}:3000/graphql`, options)
      .then(response => response.json())
      .then(({ errors, data }) => {
        if (!errors) {
          saveUserToken(JSON.stringify(data.AddUser))
            .then(() => {
              navigation.navigate("App");
            })
            .catch(error => {
              setError([error]);
            });
        } else {
          console.log(errors);
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
      <Text>Register</Text>
      {error ? displayErrors() : <Text />}
      <TextInput
        value={firstName}
        onChangeText={currentFirstName => setFirstName(currentFirstName)}
        style={{
          width: 200,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: errorFields.includes("firstName") ? "red" : "black",
          marginBottom: 10
        }}
        placeholder={"First Name"}
      />
      <TextInput
        value={lastName}
        onChangeText={currentLastName => setLastName(currentLastName)}
        style={{
          width: 200,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: errorFields.includes("lastName") ? "red" : "black",
          marginBottom: 10
        }}
        placeholder={"Last Name"}
      />
      <TextInput
        value={email}
        onChangeText={currentEmail => setEmail(currentEmail)}
        style={{
          width: 200,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: errorFields.includes("email") ? "red" : "black",
          marginBottom: 10
        }}
        placeholder={"Email"}
      />
      <TextInput
        value={password}
        onChangeText={currentPassword => setPassword(currentPassword)}
        secureTextEntry={true}
        style={{
          width: 200,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: errorFields.includes("password") ? "red" : "black",
          marginBottom: 10
        }}
        placeholder={"Password"}
      />
      <TextInput
        value={confirmPassword}
        onChangeText={currentConfirmPassword =>
          setConfirmPassword(currentConfirmPassword)
        }
        secureTextEntry={true}
        style={{
          width: 200,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: errorFields.includes("no match") ? "red" : "black",
          marginBottom: 10
        }}
        placeholder={"Confirm Password"}
      />
      <Text>
        {password === confirmPassword
          ? "Your passwords match"
          : "Your passwords do not match"}
      </Text>
      <Button title="Register" onPress={_checkVadility} />
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
  saveUserToken: params => dispatch(saveUserToken(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
