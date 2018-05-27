import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Header, Menu } from './components';
import Routes from './routes';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
});

class App extends Component {
  state = {
    showMenu: false,
    loggedIn: false,
  }
  actions = {
    showMenu: () => this.setState({ showMenu: !this.state.showMenu }),
  }

  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <Fragment>
            <Header state={this.state} actions={this.actions} />
            <Menu state={this.state} actions={this.actions} />
            <Routes />
          </Fragment>
        </ApolloProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

module.hot.accept();
