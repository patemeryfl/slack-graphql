import gql from 'graphql-tag';

const sendDirectMessageMutation = gql`
  mutation($receiverId: Int!, $text: String!, $teamId: Int!) {
    sendDirectMessage(receiverId: $receiverId, text: $text, teamId: $teamId)
  }
`;

export default sendDirectMessageMutation;
