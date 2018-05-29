import React from 'react';
import findIndex from 'lodash/findIndex';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import allTeamsQuery from '../queries/team';

import { Chat, SideBar } from '../containers';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '60px',
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
    let teamId = 1; let channelId = 1;
    const { classes } = this.props;
    ({ teamId, channelId } = this.props.match.params);
    return (
      <Query query={allTeamsQuery}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const teamIdx = teamId ? findIndex(data.allTeams, ['id', parseInt(teamId, 10)]) : 0;
          const team = data.allTeams[teamIdx];
          const channelIdx = channelId ? findIndex(team.channels, ['id', parseInt(channelId, 10)]) : 0;
          const channel = team.channels[channelIdx];

          return (
            <div className={classes.root}>
              <Chat
                currentChannel={channel}
              />
              <SideBar
                allTeams={data.allTeams}
                currentTeam={team}
                currentChannelId={channel.id}
                history={this.props.history}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ViewTeam);
