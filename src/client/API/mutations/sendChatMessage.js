import gql from 'graphql-tag';

const sendChatMessageMutation = gql`
mutation($channelId: Int!, $text: String!) {
  createMessage(channelId: $channelId, text: $text)
}
`;

export default sendChatMessageMutation;
