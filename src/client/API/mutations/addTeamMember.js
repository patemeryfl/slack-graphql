import gql from 'graphql-tag';

const addTeamMemberMutation = gql`
  mutation($teamId: Int!, $email: String!) {
    addTeamMember(teamId: $teamId, email: $email) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default addTeamMemberMutation;
