import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Messages, MessageInput } from '../components';

const style = theme => ({
  toolbar: {
    backgroundColor: theme.mixins.toolbar,
  },
  content: {
    backgroundColor: theme.palette.background.default,
  },
  chat: {
    marginTop: '0px',
    width: 'calc(100% - 270px)',
  },
});

class Chat extends Component {
    state = {
      currentChannel: '#general',
    }
    actions = {}
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.chat} >
          <Toolbar className={classes.toolbar}>
            <Typography variant="title" color="inherit" noWrap>
              #general
            </Typography>
          </Toolbar>
          <Messages />
          <MessageInput state={this.state} />
        </div>
      );
    }
}

export default withStyles(style)(Chat);
