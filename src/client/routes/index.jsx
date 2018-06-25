/* eslint no-shadow: 0 */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Menu } from '../components';
import Register from './Register';
import LogIn from './LogIn';
import CreateTeam from './CreateTeam';
import ViewTeam from './ViewTeam';
import GetStarted from './GetStarted';
import ViewMessages from './ViewMessages';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00a9f4',
      light: '#67daff',
      dark: '#007ac1',
      text: '#000000',
    },
    secondary: {
      main: '#01579b',
      light: '#4f83cc',
      dark: '#002f6c',
      text: '#ffffff',
    },
    white: {
      main: '#ffffff',
    },
  },
});

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/login' }} />)
      )}
  />
);

export default class Routes extends Component {
  state = {
    showMenu: false,
    loggedIn: false,
  };
  componentWillMount() {
    if (isAuthenticated()) {
      this.setState({ loggedIn: true });
    }
  }
  actions = {
    showMenu: () => this.setState({ showMenu: !this.state.showMenu }),
    logOut: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  };

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Menu state={this.state} actions={this.actions} />
          <Switch>
            <Route path="/" exact component={GetStarted} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={LogIn} />
            <PrivateRoute path="/viewteam/:teamId?/:channelId?" exact component={ViewTeam} />
            <PrivateRoute path="/viewteam/user/:teamId?/:userId?" exact component={ViewMessages} />
            <PrivateRoute path="/createteam" exact component={CreateTeam} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
