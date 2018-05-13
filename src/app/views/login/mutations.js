import gql from 'graphql-tag';

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    loginMerchant(email: $email, password: $password) {
      merchant{
      email
      password}
      token
    }
  }
`;

export default loginMutation;
