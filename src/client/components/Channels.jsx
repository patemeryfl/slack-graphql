import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import icons from '../assets/svgs';

const styles = theme => ({
  channels: {
    width: '200px',
    height: '100%',
    padding: '80px 10px',
    backgroundColor: '#01579b',
    color: '#ffffff',
  },
  font: {
    lineHeight: '13px',
    color: '#ffffff',
  },
  secondaryFont: {
    lineHeight: '10px',
    color: '#CCCCCC',
  },
  content: {
    backgroundColor: theme.palette.background.secondary,
    color: '#ffffff',
  },
});

const Channels = ({ currentTeamId, channels, teamName, username, state, actions, classes }) => (
  <div className={classes.channels}>
    <Typography variant="title" className={classes.font}>
      {teamName}
    </Typography>
    <Typography variant="subheading" className={classes.font}>
      {username}
    </Typography>
    <Divider />
    <List>
      <ListItem>
        <ListItemText classes={{ primary: classes.font }} primary="Channels" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" style={{ cursor: 'pointer' }} width="24" height="24" viewBox="0 0 24 24" onClick={actions.toggleAddChannel}>
          <path d={icons.add} />
        </svg>
      </ListItem>
      {channels.map(channel => (
        <ListItem key={channel.id} button onClick={() => actions.onViewChannel(currentTeamId, channel.id)}>
          <ListItemText classes={{ secondary: classes.secondaryFont }}secondary={`#${channel.name}`} />
        </ListItem>
     ))}
      <ListItem>
        <ListItemText classes={{ primary: classes.font }} primary="Direct Messages" />
      </ListItem>
      {state.directMessages.map(message => (
        <ListItem key={message.id} button onClick={() => actions.navigate(message.id)}>
          <ListItemText classes={{ secondary: classes.secondaryFont }} secondary={message.sender} />
        </ListItem>
     ))}
    </List>
  </div>
);

export default withStyles(styles)(Channels);
