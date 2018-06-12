import gql from 'graphql-tag';

const allTeamsQuery = gql`
{
  allTeams {
    id
    name
    owner
    channels {
      id
      name
    }
  }
  inviteTeams {
    id
    name
    channels {
      id
      name
    }
  }
}
`;

export default allTeamsQuery;
