import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, Divider, ListItem, ListItemText, Typography, Button } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import icons from '../assets/svgs';

const styles = theme => ({
  channels: {
    width: '200px',
    height: '100vh',
    padding: '0px 10px',
    backgroundColor: '#01579b',
    color: '#ffffff',
  },
  items: {
    marginLeft: '-20px',
    width: '33vh',
  },
  font: {
    color: '#ffffff',
  },
  headerFont: {
    fontSize: '1.5em',
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

const Channels = ({ isOwner, currentTeamId, channels, teamName, username, state, actions, classes }) => (
  <div className={classes.channels}>
    <List className={classes.items}>
      <ListItem>
        <ListItemText
          classes={{ primary: classes.headerFont, secondary: classes.secondaryFont }}
          primary={teamName}
          secondary={username}
        />
        <Notifications />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText classes={{ primary: classes.font }} primary="Channels" />
        { isOwner &&
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" style={{ cursor: 'pointer' }} width="24" height="24" viewBox="0 0 24 24" onClick={actions.toggleAddChannel}>
            <path d={icons.add} />
          </svg> }
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
    { isOwner &&
    <Button onClick={actions.toggleAddTeamMember}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" style={{ cursor: 'pointer' }} width="24" height="24" viewBox="0 0 24 24">
        <path d={icons.add} />
      </svg>&nbsp;&nbsp;
      <Typography className={classes.font}>Invite People</Typography>
    </Button>
    }
  </div>
);

export default withStyles(styles)(Channels);
