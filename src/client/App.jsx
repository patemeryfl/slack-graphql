import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
// import { Header, Footer } from './components';
import { Home, Register } from './routes';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
});

const App = () => (
  <Router>
    <ApolloProvider client={client}>
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
      </Fragment>
    </ApolloProvider>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

module.hot.accept();
