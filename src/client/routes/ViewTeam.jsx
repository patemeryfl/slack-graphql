import React from 'react';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import meQuery from '../queries/team';

import { Chat, SideBar } from '../containers';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '-10px',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class ViewTeam extends React.Component {
  state = {
    anchor: 'left',
    currentChannel: 'general',
  };

  actions = {
    handleChange: event => {
      this.setState({
        anchor: event.target.value,
      });
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
          if (!teams.length) return <Redirect to="/createteam" />;
          const teamIdx = parseInt(teamId, 10) ? findIndex(teams, ['id', parseInt(teamId, 10)]) : 0;
          const team = teamIdx === -1 ? teams[0] : teams[teamIdx];
          const channelIdx = parseInt(channelId, 10) ? findIndex(team.channels, ['id', parseInt(channelId, 10)]) : 0;
          const channel = channelIdx === -1 ? team.channels[0] : team.channels[channelIdx];

          return (
            <div className={classes.root}>
              {channel && <Chat currentChannel={channel} />}
              <SideBar
                allTeams={teams}
                currentTeam={team}
                currentChannelId={channel.id}
                history={this.props.history}
                username={username}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ViewTeam);
