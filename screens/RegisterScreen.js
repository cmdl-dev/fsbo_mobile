import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";

import { REGISTER } from "../graphqlQueries";
import { saveUserToken } from "../actions";
import { graphqlFetch } from "../utils";

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
    graphqlFetch(
      {
        firstName: firstName.length > 0 ? firstName : undefined,
        lastName: lastName.length > 0 ? lastName : undefined,
        email: email.length > 0 ? email : undefined,
        password: password.length > 0 ? password : undefined
      },
      "",
      REGISTER
    ).then(({ errors, data }) => {
      if (!errors) {
        saveUserToken(JSON.stringify(data.AddUser))
          .then(() => {
            navigation.navigate("App");
          })
          .catch(error => {
            setError([error]);
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
      <Text>Register</Text>
      {error ? displayErrors() : <Text />}
      <TextInput
        value={firstName}
        onChangeText={currentFirstName => setFirstName(currentFirstName)}
        style={[
          styles.input,
          { borderColor: errorFields.includes("firstName") ? "red" : "black" }
        ]}
        placeholder={"First Name"}
      />
      <TextInput
        value={lastName}
        onChangeText={currentLastName => setLastName(currentLastName)}
        style={[
          styles.input,
          { borderColor: errorFields.includes("lastName") ? "red" : "black" }
        ]}
        placeholder={"Last Name"}
      />
      <TextInput
        value={email}
        onChangeText={currentEmail => setEmail(currentEmail)}
        style={[
          styles.input,
          { borderColor: errorFields.includes("email") ? "red" : "black" }
        ]}
        placeholder={"Email"}
      />
      <TextInput
        value={password}
        onChangeText={currentPassword => setPassword(currentPassword)}
        secureTextEntry={true}
        style={[
          styles.input,
          { borderColor: errorFields.includes("password") ? "red" : "black" }
        ]}
        placeholder={"Password"}
      />
      <TextInput
        value={confirmPassword}
        onChangeText={currentConfirmPassword =>
          setConfirmPassword(currentConfirmPassword)
        }
        secureTextEntry={true}
        style={[
          styles.input,
          { borderColor: errorFields.includes("no match") ? "red" : "black" }
        ]}
        placeholder={"Confirm Password"}
      />
      <Text>
        {password === confirmPassword
          ? "Your passwords match"
          : "Your passwords do not match"}
      </Text>
      <Button title="Register" onPress={_checkVadility} />
      <Button title="Login" onPress={() => navigation.navigate("SignIn")} />
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
