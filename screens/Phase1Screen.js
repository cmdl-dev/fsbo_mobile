import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

import { connect } from "react-redux";
import SingleLead from "../component/SingleLead";
import { removeUserToken } from "../actions";

import { graphqlFetch } from "../utils";
import { GET_MY_LEADS } from "../graphqlQueries";

function Phase1Screen({ navigation, user }) {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    graphqlFetch({}, user.token, GET_MY_LEADS).then(({ errors, data }) => {
      if (errors) {
        setErrors(errors);
        return;
      }
      setLeads(data.leads);
    });
  }, []);

  if (leads.length === 0) {
    return (
      <View style={styles.container}>
        <Text>You don't have any leads</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {leads.map((lead, index) => {
        return <SingleLead leadInfo={lead} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "40px",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    user: state.token.token
  };
};

const mapDispatchToProps = dispatch => ({
  removeUserToken: () => dispatch(removeUserToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Phase1Screen);
