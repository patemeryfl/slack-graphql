import React from 'react';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import meQuery from '../API/queries/currentUser';
import { Chat, DirectMessages, SideBar } from '../containers';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: '-10px',
  },
});

class ViewTeam extends React.Component {
  state = {
    currentChannel: 'general',
    currentMessageUser: '',
    current: 'chat',
  };

  actions = {
    handleChange: event => {
      this.setState({
        anchor: event.target.value,
      });
    },
    onViewTeam: (id) => {
      this.props.history.push(`/viewteam/${id}`);
      this.setState({ current: 'chat' });
    },
    onViewChannel: (currentTeamId, id) => {
      this.props.history.push(`/viewteam/${currentTeamId}/${id}`);
      this.setState({ current: 'chat' });
    },
    onGetDirectMessages: (currentTeamId, id, user) => {
      this.setState({ current: 'messages', currentMessageUser: user });
      this.props.history.push(`/viewteam/${currentTeamId}/${id}`);
    },
  }

  render() {
    const { classes, match: { params: { teamId, channelId } } } = this.props;
    return (
      <Query query={meQuery} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          let teams; let username;
          if (data.me.teams.length) ({ username, teams } = data.me);
          if (!teams) return <Redirect to="/createteam" />;
          const teamIdx = parseInt(teamId, 10) ? findIndex(teams, ['id', parseInt(teamId, 10)]) : 0;
          const team = teamIdx === -1 ? teams[0] : teams[teamIdx];
          const channelIdx = parseInt(channelId, 10) ? findIndex(team.channels, ['id', parseInt(channelId, 10)]) : 0;
          const channel = channelIdx === -1 ? team.channels[0] : team.channels[channelIdx];
          return (
            <div className={classes.root}>
              <div>
                <SideBar
                  allTeams={teams}
                  currentTeam={team}
                  currentChannelId={channel.id}
                  history={this.props.history}
                  username={username}
                  navigationActions={this.actions}
                />
              </div>
              <div>
                { this.state.current === 'chat' ?
                  <Chat currentChannel={channel} /> :
                  <DirectMessages currentMessageUser={this.state.currentMessageUser} teamId={teamId} otherUserId={channelId} /> }
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ViewTeam);
