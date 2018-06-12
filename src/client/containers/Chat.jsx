import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Messages } from '../components';

const style = theme => ({
  toolbar: {
    backgroundColor: theme.mixins.toolbar,
  },
  content: {
    backgroundColor: '#ABCDEF',
  },
  input: {
    position: 'absolute',
    marginBottom: '0px',
  },
  chat: {
    backgroundColor: '#ABCDEF',
    marginTop: '0px',
    marginRight: '-8px',
    width: 'calc(100% - 260px)',
    paddingTop: '5px',
    height: '100vh',
  },
});

class Chat extends Component {
    state = {
      currentChannel: '#general',
    }
    actions = {}
    render() {
      const { classes, currentChannel } = this.props;
      return (
        <div className={classes.chat} >
          <Toolbar className={classes.toolbar}>
            <Typography variant="headline" color="inherit" noWrap>
              {`#${currentChannel.name}`}
            </Typography>
          </Toolbar>
          <Messages currentChannel={currentChannel} />
        </div>
      );
    }
}

export default withStyles(style)(Chat);
