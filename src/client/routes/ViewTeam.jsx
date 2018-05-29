import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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
    let teamId = 0; let channelId = 0;
    const { classes } = this.props;
    ({ teamId, channelId } = this.props.match.params);

    return (
      <div className={classes.root}>
        <Chat />
        <SideBar
          currentTeamId={teamId}
          currentChannelId={channelId}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ViewTeam);