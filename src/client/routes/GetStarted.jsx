import React from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, List, Divider, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { AddBox, Build, KeyboardArrowRight } from '@material-ui/icons';
import { Header } from '../components';

const state = {};
const actions = {};
const showMenu = () => {};

const GetStarted = props => (
  <div style={{ marginTop: '70px', padding: '20px' }}>
    <Header state={state} actions={actions} showMenu={showMenu} />
    <Typography style={{ fontWeight: 'bold', marginBottom: '20px' }} variant="display1">Start with a workspace</Typography>
    <List>
      <Divider />
      <ListItem button style={{ padding: '20px' }} onClick={() => props.history.push('/viewteam')} >
        <AddBox />
        <ListItemText
          primary="Find your Slack workspace"
          secondary="Join or sign in to existing workspaces"
        />
        <ListItemSecondaryAction>
          <KeyboardArrowRight />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem button style={{ padding: '20px' }} onClick={() => props.history.push('/createteam')}>
        <Build />
        <ListItemText
          primary="Create a new workspace"
          secondary="Get your company or organization on Slack"
        />
        <ListItemSecondaryAction>
          <KeyboardArrowRight />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </List>
  </div>
);

export default withRouter(GetStarted);
