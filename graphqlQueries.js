const GET_MY_LEADS = `
      query getLeads($firstName: String, $lastName: String, $email: String, $phone: String){
        leads(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone ){
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
module.exports = {
  GET_MY_LEADS,
  LOGIN,
  REGISTER
};
