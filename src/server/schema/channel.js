export default `
  type Channel {
    id: Int!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]!
  }
  type CreateChannelResponse {
    channel: Channel
    ok: Boolean!
    errors: [Error!]
  }
  type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean): CreateChannelResponse!
  }
`;
