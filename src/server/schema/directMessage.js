export default `
  type DirectMessage {
    id: Int!
    text: String!
    sender: User!
    receiverId: Int!
    created_at: String!
  }

  type CreateDirectMessageResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type Query {
    directMessages(teamId: Int!, otherUserId: Int!): [DirectMessage!]!
  }

  type Mutation {
    sendDirectMessage(receiverId: Int!, text: String!, teamId: Int!): Boolean!
    createDirectMessage(email: String!): CreateDirectMessageResponse!
  }
`;

