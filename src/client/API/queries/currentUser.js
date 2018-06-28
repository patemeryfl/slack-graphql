import gql from 'graphql-tag';

const meQuery = gql`
{
  me {
    username
    id
    teams {
      id
      name
      admin
      directMessageMembers {
        id
        username
      }
      channels {
        id
        name
      }
    }
  }
}
`;

export default meQuery;
