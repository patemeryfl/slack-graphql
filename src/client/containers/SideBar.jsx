import React, { Component } from 'react';
import findIndex from 'lodash/findIndex';
import { Query } from 'react-apollo';
import decode from 'jwt-decode';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import allTeamsQuery from '../queries/team';
import { Teams, Channels, AddChannel } from '../components';

let username = '';
try {
  const token = localStorage.getItem('token');
  if (token) {
    const { user } = decode(token);
    ({ username } = user.username);
  }
} catch (err) {
  console.log(err);
}

const style = theme => ({
  sidebar: {
    marginTop: '30px',
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
      openAddChannel: false,
      name: '',
      isPublic: false,
      nameError: '',
      directMessages: [
        { id: 1, sender: 'Mike' },
        { id: 2, sender: 'Steve' },
      ],
    }
    actions = {
      onViewTeam: (id) => {
        this.props.history.push(`/viewteam/${id}`);
      },
      onViewChannel(currentTeamId, id) {
        this.props.history.push(`/viewteam/${currentTeamId}/${id}`);
      },
      addChannel: async (teamId, createChannel) => {
        if (this.state.name === '') {
          this.setState({ nameError: 'Channel names cannot be blank' });
        } else {
          this.setState({ nameError: '' });
          const { name, isPublic } = { ...this.state };
          const response = await createChannel({ variables: { teamId, name, public: isPublic } });
          const { ok, errors } = response.data.createChannel;
          if (ok) {
            this.actions.toggleAddChannel();
          } else {
            const err = {};
            errors.forEach(({ path, message }) => {
              err[`${path}Error`] = message;
            });
            this.setState(err);
          }
        }
      },
      toggleAddChannel: () => {
        this.setState({
          nameError: '',
          openAddChannel: !this.state.openAddChannel,
          name: '',
        });
      },
      onChannelInputChange: (prop) => (event) => {
        this.setState({ [prop]: event.target.value });
      },
      onChannelTypeChange: name => event => {
        this.setState({ [name]: event.target.checked });
      },
    }
    render() {
      const { classes, currentTeamId } = this.props;
      return (
        <Drawer variant="permanent" className={classes.sidebar}>
          <AddChannel currentTeamId={currentTeamId} state={this.state} actions={this.actions} />
          <Query query={allTeamsQuery}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                const teamIdx = currentTeamId ? findIndex(data.allTeams, ['id', parseInt(currentTeamId, 10)]) : 0;
                const team = data.allTeams[teamIdx];
                return (
                  <div className={classes.inner}>
                    <Teams
                      teams={data.allTeams}
                      state={this.state}
                      actions={this.actions}
                    />
                    <Channels
                      currentTeamId={currentTeamId}
                      teamName={team.name}
                      username={username}
                      channels={team.channels}
                      state={this.state}
                      actions={this.actions}
                    />
                  </div>
                );
            }}
          </Query>
        </Drawer>
      );
    }
}

export default withStyles(style)(SideBar);
