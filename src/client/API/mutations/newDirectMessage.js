import gql from 'graphql-tag';

const createNewDirectMessageMutation = gql`
  mutation($teamId: Int!, $email: String!) {
    newDirectMessage(teamId: $teamId, email: $email) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default createNewDirectMessageMutation;
