import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  team: {
    width: '60px',
    padding: '70px 0px',
    backgroundColor: '#002f6c',
  },
  content: {
    backgroundColor: theme.palette.background.default,
  },
});

const Teams = ({ state, actions, classes }) => (
  <List className={classes.team}>
    {state.teams.map(team => (
      <Avatar style={{ margin: '10px' }} onClick={() => actions.navigate(team.id)}>{team.name}</Avatar>
    ))}
  </List>
);

export default withStyles(styles)(Teams);
