import gql from 'graphql-tag';

const createDirectMessageMutation = gql`
  mutation($email: String!) {
    createDirectMessage(email: $email) {
      user {
          id
          username
      }
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default createDirectMessageMutation;
