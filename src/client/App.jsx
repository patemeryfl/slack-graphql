import React from 'react';
import ReactDOM from 'react-dom';
/* eslint-disable-next-line no-unused-vars */
import { hot } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

import Routes from './routes';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const middlewareLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      'x-token': localStorage.getItem('token'),
      'x-refresh-token': localStorage.getItem('refreshToken'),
    },
  });

  return forward(operation);
});

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const { response: { headers } } = operation.getContext();
    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }

    return response;
  }));

const httpLinkWithMiddleware = afterwareLink.concat(middlewareLink.concat(httpLink));


const client = new ApolloClient({
  link: httpLinkWithMiddleware,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

module.hot.accept();
