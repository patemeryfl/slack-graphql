import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { Teams, Channels, CreateChannel, AddTeamMember, NewDirectMessage } from '../components';

const style = theme => ({
  sidebar: {
    marginTop: '30px',
    backgroundColor: '#235796',
    border: '0px',
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
      NewDirectMessage: false,
      email: '',
      name: '',
      isPublic: false,
      nameError: '',
      directMessages: [
        { id: 1, user: { id: 1, name: 'Mike' } },
        { id: 2, user: { id: 2, name: 'Steve' } },
      ],
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
      NewDirectMessage: async (teamId, newDirectMessage) => {
        if (this.state.email === '') {
          this.setState({ nameError: 'Please enter an email.' });
        } else {
          this.setState({ nameError: '' });
          const { email } = { ...this.state };
          const response = await newDirectMessage({ variables: { teamId, email } });
          const { ok, errors } = response.data.addTeamMember;

          if (ok) {
            this.actions.toggleModel('NewDirectMessage');
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
        <Drawer variant="permanent" className={classes.sidebar}>
          <CreateChannel currentTeamId={currentTeam.id} state={this.state} actions={this.actions} />
          <AddTeamMember currentTeamId={currentTeam.id} state={this.state} actions={this.actions} />
          <NewDirectMessage currentTeamId={currentTeam.id} state={this.state} actions={this.actions} />
          <div className={classes.inner}>
            <Teams
              teams={allTeams}
              state={this.state}
              actions={this.actions}
            />
            <Channels
              isOwner={currentTeam.admin}
              currentTeamId={currentTeam.id}
              teamName={currentTeam.name}
              username={username}
              channels={currentTeam.channels}
              state={this.state}
              actions={this.actions}
              navigationActions={navigationActions}
            />
          </div>
        </Drawer>
      );
    }
}

export default withStyles(style)(SideBar);
