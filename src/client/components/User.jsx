import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const UserQuery = gql`
{
   allUsers {
     id
     username
     email
  }
}
`;

const User = () => (
  <Query query={UserQuery}>
    {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return data.allUsers.map(user => (
          <p key={user.id}>{`User: ${user.username} Email: ${user.email}`}</p>
        ));
    }}
  </Query>
);

export default User;

