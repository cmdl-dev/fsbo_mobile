import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  Button,
  StatusBar,
  FlatList,
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
  const _handleRemoveLead = id => {
    const newLeads = leads.filter(lead => lead.id !== id && lead);
    setLeads(newLeads);
  };
  const _handleMoveToNextPhase = () => {};

  if (leads.length === 0) {
    return (
      <View style={styles.container}>
        <Text>You don't have any leads</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.container}
      data={leads}
      renderItem={({ item }) => (
        <SingleLead
          key={item.id}
          index={item.id}
          removeItem={_handleRemoveLead}
          leadInfo={item}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "40px",
    backgroundColor: "#fff"
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
