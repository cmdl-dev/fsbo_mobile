import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, RefreshControl } from "react-native";

import SingleLead from "../component/SingleLead";

import { graphqlFetch } from "../utils";
import { UPDATE_PHASE } from "../graphqlQueries";

function SinglePhase({
  user,
  currentPhase,
  renderLeads,
  leads,
  handleRefresh,
  isRefreshing
}) {
  const [renderedLeads, setRenderedLeads] = useState([]);
  // updateRendered leads to the new set of leads that are comming in
  useEffect(() => {
    setRenderedLeads(leads);
  }, [leads]);

  const _handleRemoveLead = id => {
    const newLeads = renderedLeads.filter(lead => lead.id !== id && lead);
    setRenderedLeads(newLeads);
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
  return (
    <FlatList
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={isRefreshing} />
      }
      keyExtractor={(item, index) => index.toString()}
      style={styles.container}
      data={renderedLeads}
      onEndReached={renderLeads}
      onEndReachedThreshold={0.9}
      renderItem={({ item }) => (
        <SingleLead
          key={item.id}
          currentPhase={currentPhase}
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

export default SinglePhase;
