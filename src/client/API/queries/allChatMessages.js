
import gql from 'graphql-tag';

const allChatMessagesQuery = gql`
query($channelId: Int!) {
  messages(channelId: $channelId) {
    id
    text
    user {
      username
    }
    created_at
  }
}
`;

export default allChatMessagesQuery;
