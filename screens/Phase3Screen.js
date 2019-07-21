import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";

import { connect } from "react-redux";
import SinglePhase from "../component/SinglePhase";
import { removeUserToken } from "../actions";

import { graphqlFetch } from "../utils";
import { GET_MY_LEADS } from "../graphqlQueries";

function Phase3Screen({ navigation, user }) {
  const currentPhase = 3;
  const leadsRendered = useRef(false);
  const initialRender = useRef(false);
  const refreshing = useRef(false);
  const [leadObject, setLeadObject] = useState({ offset: 0, limit: 20 });
  const [leads, setLeads] = useState([]);
  const [renderedLeads, setRenderedLeads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLeads();
  }, []);
  // This gets called when leads gets populated
  useEffect(() => {
    if (leadsRendered.current) {
      console.log("leads got changed");
      _renderLeads();
    }
  }, [leads]);

  const getLeads = () => {
    return graphqlFetch({ phase: currentPhase }, user.token, GET_MY_LEADS).then(
      ({ errors, data }) => {
        if (errors) {
          setError(errors);
          return;
        }
        console.log("phase2 data", data);
        setLeads(data.leads);
        leadsRendered.current = true;
      }
    );
  };
  const _handleRefresh = () => {
    console.log("Refreshing....");
    refreshing.current = true;
    getLeads().finally(() => {
      refreshing.current = false;
      console.log("Done....");
    });
  };
  const _renderLeads = () => {
    const start = leadObject.offset;
    const end = start + leadObject.limit;

    // There is no more objects to fetch
    if (start > leads.length && initialRender.current) {
      return;
    }
    const newRenderedLeads = leads.slice(start, end);
    setLeadObject({
      offset: leadObject.offset + leadObject.limit,
      limit: leadObject.limit
    });
    setRenderedLeads([...renderedLeads, ...newRenderedLeads]);
    initialRender.current = true;
  };

  const displayErrors = () => {
    console.log(error);
    return (
      <View>
        {error.map((err, index) => (
          <Text key={index}>{err.message}</Text>
        ))}
      </View>
    );
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
    <SinglePhase
      user={user}
      handleRefresh={_handleRefresh}
      isRefreshing={refreshing.current}
      currentPhase={currentPhase}
      leads={renderedLeads}
      renderLeads={_renderLeads}
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
)(Phase3Screen);
