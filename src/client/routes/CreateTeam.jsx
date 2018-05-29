import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CreateTeamForm } from '../components';

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
        let response;
        try {
          response = await createTeam({ variables: { name } });
        } catch (e) {
          this.setState({ authError: 'You must be logged in to perform this action.' });
        }
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
