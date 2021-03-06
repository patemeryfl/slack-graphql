export default `
  type Team {
    id: Int!
    name: String!
    directMessageMembers: [User!]!
    channels: [Channel!]!
    admin: Boolean!
  }
  type CreateTeamResponse {
    ok: Boolean!
    team: Team
    errors: [Error!]
  }
  type VoidResponse {
    ok: Boolean!
    errors: [Error!]
  }
  type Query {
    allTeams: [Team!]!
    inviteTeams: [Team!]!
  }
  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
    addTeamMember(teamId: Int!, email: String!): VoidResponse!
  }
`;
