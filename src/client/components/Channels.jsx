import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography, Button } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import icons from '../assets/svgs';

const styles = theme => ({
  channels: {
    height: '100vh',
    color: '#ffffff',
  },
  items: {
    width: '100%',
    padding: '0px',
  },
  item: { padding: '3px 0px 7px 15px' },
  title: { padding: '3px' },
  font: {
    color: '#ffffff',
    paddingLeft: '5px',
  },
  headerFont: {
    marginTop: '5px',
    fontSize: '1.5em',
    fontWeight: 'bold',
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

const Channels = ({ currentTeam, username, actions, navigationActions, classes }) => (
  <div className={classes.channels}>
    <List className={classes.items}>
      <ListItem className={classes.item}>
        <ListItemText
          classes={{ primary: classes.headerFont, secondary: classes.secondaryFont }}
          primary={currentTeam.name}
          secondary={username}
        />
        <Notifications />
      </ListItem><br />
      <ListItem className={classes.title}>
        <ListItemText classes={{ primary: classes.font }} primary="Channels" />
        { currentTeam.isOwner &&
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" style={{ cursor: 'pointer' }} width="24" height="24" viewBox="0 0 24 24" onClick={() => actions.toggleModel('AddChannel')}>
            <path d={icons.add} />
          </svg> }
      </ListItem>
      {currentTeam.channels.map(channel => (
        <ListItem className={classes.item} key={channel.id} button onClick={() => navigationActions.onViewChannel(currentTeam.id, channel.id)}>
          <ListItemText classes={{ secondary: classes.secondaryFont }}secondary={`# ${channel.name}`} />
        </ListItem>
     ))}<br />
      <ListItem className={classes.title}>
        <ListItemText classes={{ primary: classes.font }} primary="Direct Messages" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" style={{ cursor: 'pointer' }} width="24" height="24" viewBox="0 0 24 24" onClick={() => actions.toggleModel('CreateDirectMessage')}>
          <path d={icons.add} />
        </svg>
      </ListItem>
      {currentTeam.directMessageMembers.map(member => (
        <ListItem className={classes.item} key={member.id} button onClick={() => navigationActions.onGetDirectMessages(currentTeam.id, member.id, member.username)}>
          <ListItemText classes={{ secondary: classes.secondaryFont }} secondary={member.username} />
        </ListItem>
     ))}
      { currentTeam.isOwner &&
        <Button onClick={() => actions.toggleModel('AddTeamMember')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" style={{ cursor: 'pointer' }} width="24" height="24" viewBox="0 0 24 24">
            <path d={icons.add} />
          </svg>&nbsp;&nbsp;
          <Typography className={classes.font}>Invite People</Typography>
        </Button>
    }<br />
      <ListItem className={classes.title}>
        <ListItemText classes={{ primary: classes.font }} primary="Apps" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" style={{ cursor: 'pointer' }} width="24" height="24" viewBox="0 0 24 24" onClick={() => actions.toggleModel('CreateDirectMessage')}>
          <path d={icons.add} />
        </svg>
      </ListItem>
      {currentTeam.directMessageMembers.map(member => (
        <ListItem className={classes.item} key={member.id} button onClick={() => navigationActions.onGetDirectMessages(currentTeam.id, member.id, member.username)}>
          <ListItemText classes={{ secondary: classes.secondaryFont }} secondary={member.username} />
        </ListItem>
     ))}
    </List>
  </div>
);

export default withStyles(styles)(Channels);
