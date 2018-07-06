import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { Phone, Info, Settings, Star, PermIdentity, Room } from '@material-ui/icons';
import { ChatSearch } from '../components';

const styles = () => ({
  toolbar: {
    backgroundColor: '#ABCDEF',
    height: '50px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px',
  },
  title: { marginTop: '-5px', padding: '5px', fontWeight: 'bold' },
  actions: { padding: '8px 3px 3px 3px' },
});


const InfoBar = ({ classes, title, actions, state }) => (
  <Toolbar className={classes.toolbar} disableGutters>
    <div>
      <Typography variant="title" color="inherit" noWrap className={classes.title}>
        {title}
      </Typography>
      <Star /> <PermIdentity /> <Room />
    </div>
    <div>
      <Phone className={classes.actions} nativeColor="white" />
      <Info className={classes.actions} />
      <Settings className={classes.actions} />
      <ChatSearch state={state} actions={actions} />
    </div>
  </Toolbar>
);

export default withStyles(styles)(InfoBar);
