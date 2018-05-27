import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { LogInForm } from '../components';

const loginMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

class LogIn extends Component {
    state = {
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
      showPassword: false,
    }

    actions = {
      handleChange: prop => (event) => {
        this.setState({ [prop]: event.target.value });
      },
      handleMouseDownPassword: (event) => {
        event.preventDefault();
      },
      handleClickShowPassword: () => {
        this.setState({ showPassword: !this.state.showPassword });
      },
      submitLogin: async (register) => {
        this.setState({ usernameError: '', passwordError: '' });
        const { username, password } = { ...this.state };
        const response = await register({ variables: { username, password } });
        const { ok, errors } = response.data.register;
        if (ok) {
          this.props.history.push('/');
        } else {
          const err = {};
          errors.forEach(({ path, message }) => {
            err[`${path}Error`] = message;
          });
          this.setState(err);
        }
      },
      clearForm: () => {
        this.setState({ username: '', password: '' });
      },
    }
    render() {
      return (
        <div style={{ marginTop: '70px' }}>
          <Mutation mutation={loginMutation}>
            {(register, { data }) => (
              <LogInForm
                register={() => this.props.history.push('/register')}
                login={() => this.actions.submitLogIn(register)}
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
