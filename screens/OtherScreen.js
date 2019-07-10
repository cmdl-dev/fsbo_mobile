import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";

function OtherScreen({ navigation, token }) {
  const [valid, setValid] = useState(null);
  useEffect(() => {
    const email = "tinhaoeuaoeuaoeu572@gmail.com";
    const GET_USER = `
    {
      user(email: "${email}"){
        email
        firstName
        lastName
        id
      }
    }
    `;
    const options = {
      method: "post",
      body: JSON.stringify({ query: GET_USER }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("http://192.168.1.3:3000/graphql", options)
      .then(response => response.json())
      .then(({ data }) => {
        if (data.user) {
          setValid({ valid: true, message: data.user.email });
        } else {
          setValid({ valid: false, message: "User does not exist" });
        }
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text>
        Other screen{token.type} {token.token}
      </Text>
      {valid ? <Text>You are valid {valid.message} </Text> : <Text />}
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
