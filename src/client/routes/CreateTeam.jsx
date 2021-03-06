import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Header, CreateTeamForm } from '../components';

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

class LogIn extends Component {
  state = {
    name: '',
    nameError: '',
    authError: '',
    showMenu: false,
  };

  actions = {
    handleChange: (prop) => (event) => {
      this.setState({ [prop]: event.target.value });
    },
    createTeam: async (createTeam) => {
      this.setState({ nameError: '', authError: '' });
      if (this.state.name === '') {
        this.setState({ nameError: 'Team name must be provided' });
      } else {
        const { name } = { ...this.state };
        // let response;
        // try {
        const response = await createTeam({ variables: { name } });
        // } catch (e) {
        //   this.setState({ authError: 'You must be logged in to perform this action.' });
        //   return;
        // }
        const { ok, errors, team } = response.data.createTeam;
        if (ok) {
          this.props.history.push(`/viewteam/${team.id}`);
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
      this.setState({ name: '' });
    },
  };
  render() {
    return (
      <div style={{ marginTop: '70px' }}>
        <Header state={this.state} actions={this.actions} showMenu={this.state.showMenu} />
        <Mutation mutation={createTeamMutation}>
          {(createTeam) => (
            <CreateTeamForm
              createTeam={() => this.actions.createTeam(createTeam)}
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
