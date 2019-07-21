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
import { GET_MY_LEADS, UPDATE_PHASE } from "../graphqlQueries";

function Phase1Screen({ navigation, user }) {
  const [leadObject, setLeadObject] = useState({ offset: 0, limit: 20 });
  const [leads, setLeads] = useState([]);
  const [renderedLeads, setRenderedLeads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    graphqlFetch({ phase: 1 }, user.token, GET_MY_LEADS).then(
      ({ errors, data }) => {
        if (errors) {
          setError(errors);
          return;
        }
        console.log("data", data);
        setLeads(data.leads);
      }
    );
  }, []);
  useEffect(() => {
    console.log("Use effect");
    _renderLeads();
  }, [leads]);

  const displayErrors = () => {
    return (
      <View>
        {error.map((err, index) => (
          <Text key={index}>{err.message}</Text>
        ))}
      </View>
    );
  };
  const _handleRemoveLead = id => {
    const newLeads = renderedLeads.filter(lead => lead.id !== id && lead);
    setRenderedLeads(newLeads);
  };
  const _renderLeads = () => {
    const start = leadObject.offset;
    const end = start + leadObject.limit;

    // There is no more objects to fetch
    if (start > leads.length) {
      return;
    }
    const newRenderedLeads = leads.slice(start, end);
    setLeadObject({ offset: leadObject.offset + leadObject.limit, limit: 20 });
    setRenderedLeads([...renderedLeads, ...newRenderedLeads]);
  };
  const _handleMoveToNextPhase = (toPhase, leadId) => {
    return graphqlFetch(
      { to: toPhase, id: leadId },
      user.token,
      UPDATE_PHASE
    ).then(({ errors, data }) => {
      if (errors) {
        setError(errors);
        return;
      }
      return data;
    });
  };

  if (renderedLeads.length === 0) {
    return (
      <View style={styles.container}>
        {error && displayErrors()}
        <Text>You don't have any leads</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.container}
      data={renderedLeads}
      onEndReached={_renderLeads}
      onEndReachedThreshold={0.7}
      renderItem={({ item }) => (
        <SingleLead
          key={item.id}
          currentPhase={1}
          movePhase={_handleMoveToNextPhase}
          removeItem={_handleRemoveLead}
          leadInfo={item}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingRight: 10,
    paddingLeft: 10,
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
