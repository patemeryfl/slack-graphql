import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  team: {
    height: '100vh',
    width: '60px',
    padding: '70px 0px',
    backgroundColor: '#002f6c',
  },
  content: {
    backgroundColor: theme.palette.background.default,
  },
});

const Teams = ({ history, teams, actions, classes }) => (
  <List className={classes.team}>
    {teams.map(team => (
      <Avatar
        key={team.id}
        style={{ margin: '10px', cursor: 'pointer' }}
        onClick={() => actions.onViewTeam(team.id)}
      >{team.name.charAt(0).toUpperCase()}
      </Avatar>
    ))}
    <Avatar
      style={{ marginLeft: '10px', cursor: 'pointer', fontSize: '25px' }}
      onClick={() => history.push('/createteam')}
    >
    +
    </Avatar>
  </List>
);

export default withRouter(withStyles(styles)(Teams));
