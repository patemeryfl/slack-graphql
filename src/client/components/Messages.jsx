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
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    '&:nthChild(even)': {
      backgroundColor: '#F2F2F2',
    },
  },
  list: {
    display: 'flex',
    flexDirection: 'column-reverse',
    overflowY: 'auto',
    '&:nthChild(even)': {
      backgroundColor: '#F2F2F2',
    },
  },
});

class Messages extends React.Component {
  state = {
    input: '',
  };

  actions = {
    onMessageInputChange: (e) => {
      this.setState({ input: e.target.value });
    },
    handleSubmit: async (channel, submitMessage) => {
      const { id } = channel;
      const text = this.state.input;
      if (!this.state.input) return;
      const response = await submitMessage({ variables: { channelId: id, text } });
      if (response.data.createMessage) this.setState({ input: '' });
    },
  }

  render() {
    const { classes, messages } = this.props;
    return (
      <div className={classes.root}>
        <List className={classes.list}>
          {messages.map(message => (
            <ListItem key={message.id} dense button className={classes.listItem}>
              <Avatar alt={message.username}>{message.user.username.charAt(0).toUpperCase()}</Avatar>
              <ListItemText primary={message.text} />
              <ListItemSecondaryAction>
                {message.createdAt}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Messages);
