const GET_MY_LEADS = `
      query getLeads($phase: Int!){
        leads(phase: $phase ){
          id
          firstName
          lastName
          email
          phone
        }
      }
`;

const LOGIN = `
  query getUser($email: String!, $password: String!){
    user(email: $email, password: $password){
      email
      firstName
      lastName
      token
    }
  }
`;
const REGISTER = `
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, ){
      AddUser(firstName: $firstName lastName: $lastName email: $email password: $password){
          firstName
          lastName
          email
          token
      }
  }
`;
const UPDATE_PHASE = `
  mutation changeLead($id: Int!, $to: Int!){
    ChangeLead(id:$id, to:$to){
      id
      firstName
      lastName
      phone
      email
    }
  }
`;
module.exports = {
  GET_MY_LEADS,
  LOGIN,
  UPDATE_PHASE,
  REGISTER
};
