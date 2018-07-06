import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Teams, Channels, CreateChannel, AddTeamMember, CreateDirectMessage } from '../components';

const style = theme => ({
  sidebar: {
    marginTop: '0px',
    backgroundColor: '#235796',
    border: '0px',
    width: '240px',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    backgroundColor: theme.palette.background.default,
  },
});

class SideBar extends Component {
    state = {
      AddChannel: false,
      AddTeamMember: false,
      CreateDirectMessage: false,
      email: '',
      name: '',
      isPublic: false,
      nameError: '',
    }
    actions = {
      addChannel: async (teamId, createChannel) => {
        if (this.state.name === '') {
          this.setState({ nameError: 'Channel names cannot be blank' });
        } else {
          this.setState({ nameError: '' });
          const { name, isPublic } = { ...this.state };
          const response = await createChannel({ variables: { teamId, name, public: isPublic } });
          const { ok, errors } = response.data.createChannel;
          if (ok) {
            this.actions.toggleModel('AddChannel');
          } else {
            const err = {};
            errors.forEach(({ path, message }) => {
              err[`${path}Error`] = message;
            });
            this.setState(err);
          }
        }
      },
      addTeamMember: async (teamId, addTeamMember) => {
        if (this.state.email === '') {
          this.setState({ nameError: 'Please enter an email.' });
        } else {
          this.setState({ nameError: '' });
          const { email } = { ...this.state };
          const response = await addTeamMember({ variables: { teamId, email } });
          const { ok, errors } = response.data.addTeamMember;

          if (ok) {
            this.actions.toggleModel('AddTeamMember');
          } else {
            const err = {};
            errors.forEach(({ message }) => {
              err.nameError = message;
            });
            this.setState(err);
          }
        }
      },
      createDirectMessage: async (teamId, createDirectMessage) => {
        if (this.state.email === '') {
          this.setState({ nameError: 'Please enter an email.' });
        } else {
          this.setState({ nameError: '' });
          const { email } = { ...this.state };
          const response = await createDirectMessage({ variables: { email } });
          const { ok, errors, user } = response.data.createDirectMessage;

          if (ok) {
            this.actions.toggleModel('CreateDirectMessage');
            this.props.navigationActions.onGetDirectMessages(teamId, user.id, user.username);
          } else {
            const err = {};
            errors.forEach(({ message }) => {
              err.nameError = message;
            });
            this.setState(err);
          }
        }
      },
      toggleModel: (model) => {
        this.setState({
          nameError: '',
          [model]: !this.state[model],
          name: '',
          email: '',
        });
      },
      onInputChange: (prop) => (event) => {
        this.setState({ [prop]: event.target.value });
      },
      onChannelTypeChange: name => event => {
        this.setState({ [name]: event.target.checked });
      },
    }
    render() {
      const { classes, navigationActions, allTeams, currentTeam, username } = this.props;
      return (
        <div className={classes.sidebar}>
          <CreateChannel currentTeamId={currentTeam.id} state={this.state} actions={this.actions} />
          <AddTeamMember currentTeamId={currentTeam.id} state={this.state} actions={this.actions} />
          <CreateDirectMessage currentTeamId={currentTeam.id} state={this.state} actions={this.actions} />
          <div className={classes.inner}>
            <Teams
              teams={allTeams}
              state={this.state}
              navigationActions={navigationActions}
            />
            <Channels
              currentTeam={currentTeam}
              username={username}
              actions={this.actions}
              navigationActions={navigationActions}
            />
          </div>
        </div>
      );
    }
}

export default withStyles(style)(SideBar);
