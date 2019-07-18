import { BASE_URL } from "./config/config";

/**
 * Handles the fetch request for all graphql fetch requests to the server
 *
 * @param {object} variables The variabels that are going to be inserted into the query
 * @param {string} userToken The bearer token that idetifies what user is creating the request
 * @param {string} query The graphql query that we are sending to the server
 */
export const graphqlFetch = (variables, userToken, query) => {
  const options = {
    method: "POST",
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`
    }
  };
  return fetch(`${BASE_URL}:3000/graphql`, options)
    .then(response => response.json())
    .then(json => {
      return json;
    });
};
