import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  channels: {
    width: '200px',
    height: '100%',
    padding: '70px 10px',
    backgroundColor: '#01579b',
    color: '#ffffff',
  },
  content: {
    backgroundColor: theme.palette.background.secondary,
    color: '#ffffff',
  },
});

const Channels = ({ state, actions, classes }) => (
  <div className={classes.channels}>
    <Typography variant="title" color="inherit" className={classes.flex}>
      {state.teamName}
    </Typography>
    <Typography variant="subheading" color="inherit" className={classes.flex}>
      {state.userName}
    </Typography>
    <Divider />
    <List>
      <ListItem button>
        <ListItemText primary="Channels" />
      </ListItem>
      {state.channels.map(channel => (
        <ListItem button onClick={() => actions.navigate(channel.id)}>
          <ListItemText primary={channel.name} />
        </ListItem>
     ))}
      <ListItem button>
        <ListItemText primary="Direct Messages" />
      </ListItem>
      {state.directMessages.map(message => (
        <ListItem button onClick={() => actions.navigate(message.id)}>
          <ListItemText primary={message.sender} />
        </ListItem>
     ))}
    </List>
  </div>
);

export default withStyles(styles)(Channels);
