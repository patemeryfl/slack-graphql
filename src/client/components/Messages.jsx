import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Messages extends React.Component {
  state = {
    messages: [
      { id: 1, username: 'PE', message: 'Hey' },
      { id: 2, username: 'JM', message: 'Hi' },
      { id: 3, username: 'MS', message: 'Sup' },
      { id: 4, username: 'PE', message: 'Yes' },
    ],
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List>
          {this.state.messages.map(message => (
            <ListItem key={message.id} dense button className={classes.listItem}>
              <Avatar alt={message.username}>{message.username.charAt(0).toUpperCase()}</Avatar>
              <ListItemText primary={message.message} />
              <ListItemSecondaryAction>
                  []
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Messages);
