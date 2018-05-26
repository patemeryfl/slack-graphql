import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const User = () => (
  <Query
    query={gql`
            {
               allUsers {
                 id
                 username
                 email
              }
            }
        `}
  >
    {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return data.allUsers.map(user => (
          <p>{`User: ${user.username} Email: ${user.email}`}</p>
        ));
    }}
  </Query>
);

export default User;

