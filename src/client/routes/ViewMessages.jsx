import React from 'react';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import meQuery from '../API/queries/currentUser';
import { DirectMessages, SideBar } from '../containers';

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

class ViewMessages extends React.Component {
  state = {
    anchor: 'left',
    currentChannel: 'general',
    currentDirectMessageId: 0,
  };

  actions = {
    handleChange: event => {
      this.setState({
        anchor: event.target.value,
      });
    },
  }

  render() {
    const { classes, match: { params: { teamId, userId } } } = this.props;
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

          return (
            <div className={classes.root}>
              <DirectMessages teamId={teamId} otherUserId={userId} />
              <SideBar
                allTeams={teams}
                currentTeam={team}
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

export default withStyles(styles)(ViewMessages);
