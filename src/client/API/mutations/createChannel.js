import gql from 'graphql-tag';

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!, $public: Boolean!) {
    createChannel(teamId: $teamId, name: $name, public: $public) {
      ok
      channel {
        id
        name
      }
      errors {
        path
        message
      }
    }
  }
`;

export default createChannelMutation;
