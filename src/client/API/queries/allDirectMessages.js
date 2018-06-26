
import gql from 'graphql-tag';

const directMessagesQuery = gql`
query($teamId: Int!, $otherUserId: Int!) {
  directMessages(teamId: $teamId, otherUserId: $otherUserId) {
    id
    sender {
      username
    }
    text
    created_at
  }
}
`;

export default directMessagesQuery;
