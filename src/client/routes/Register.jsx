import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Header, RegisterForm } from '../components';

const registerMutation = gql`
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

class Register extends Component {
    state = {
      username: '',
      usernameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      showPassword: false,
      showMenu: false,
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
      submitRegistration: async (register) => {
        this.setState({ usernameError: '', emailError: '', passwordError: '' });
        const { username, email, password } = { ...this.state };
        const response = await register({ variables: { username, email, password } });
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
        this.setState({ username: '', email: '', password: '' });
      },
    }
    render() {
      return (
        <div style={{ marginTop: '70px' }}>
          <Header state={this.state} actions={this.actions} showMenu={this.state.showMenu} />
          <Mutation mutation={registerMutation}>
            {(register) => (
              <RegisterForm
                submit={() => this.actions.submitRegistration(register)}
                actions={this.actions}
                state={this.state}
              />
            )}
          </Mutation>
        </div>
      );
    }
}

export default Register;
