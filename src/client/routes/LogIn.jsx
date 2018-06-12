import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { LogInForm } from '../components';

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

class LogIn extends Component {
  state = {
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    showPassword: false,
  };

  actions = {
    handleChange: (prop) => (event) => {
      this.setState({ [prop]: event.target.value });
    },
    handleMouseDownPassword: (event) => {
      event.preventDefault();
    },
    handleClickShowPassword: () => {
      this.setState({ showPassword: !this.state.showPassword });
    },
    submitLogin: async (login) => {
      this.setState({ emailError: '', passwordError: '' });
      if (this.state.email === '') {
        this.setState({ emailError: 'Email must be provided' });
      } else if (this.state.password === '') {
        this.setState({ passwordError: 'Password must be provided' });
      } else {
        const { email, password } = { ...this.state };
        const response = await login({ variables: { email, password } });
        const { ok, token, refreshToken, errors } = response.data.login;
        if (ok) {
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          this.props.history.push('/viewteam');
        } else {
          const err = {};
          errors.forEach(({ path, message }) => {
            err[`${path}Error`] = message;
          });
          this.setState(err);
        }
      }
    },
    clearForm: () => {
      this.setState({ email: '', password: '' });
    },
  };
  render() {
    return (
      <div style={{ marginTop: '70px' }}>
        <Mutation mutation={loginMutation}>
          {(login) => (
            <LogInForm
              register={() => this.props.history.push('/register')}
              login={() => this.actions.submitLogin(login)}
              actions={this.actions}
              state={this.state}
            />
          )}
        </Mutation>
      </div>
    );
  }
}

export default LogIn;
