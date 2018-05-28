/* eslint no-shadow: 0 */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Header, Menu } from '../components';
import Home from './Home';
import Register from './Register';
import LogIn from './LogIn';
import CreateTeam from './CreateTeam';
import ViewTeam from './ViewTeam';

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
  actions = {
    showMenu: () => this.setState({ showMenu: !this.state.showMenu }),
  };
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Header state={this.state} actions={this.actions} />
          <Menu state={this.state} actions={this.actions} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={LogIn} />
            <PrivateRoute path="/viewteam" exact component={ViewTeam} />
            <PrivateRoute path="/createteam" exact component={CreateTeam} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
