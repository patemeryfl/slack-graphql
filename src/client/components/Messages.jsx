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
    flexDirection: 'column',
    overflowY: 'auto',
    '&:nthChild(even)': {
      backgroundColor: '#F2F2F2',
    },
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

class Messages extends React.Component {
  state = {
    nothing: '',
  };

  componentDidMount() {
    if (this.props.type === 'chatMessages') {
      this.props.subscribeToMessages(this.props.currentChannel.id);
    } else {
      this.props.subscribeToMessages();
    }
  }

  componentWillReceiveProps({ currentChannel }, { teamId, userId }) {
    if (this.props.type === 'chatMessages') {
      const newId = this.props.currentChannel.id;
      if (newId !== currentChannel.id) {
        this.props.subscribeToMessages(currentChannel.id);
      }
    } else if (this.props.teamId !== teamId || this.props.userId !== userId) {
      this.props.subscribeToMessages();
    }
  }

  render() {
    const { classes, loading, error, data } = this.props;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const { messages, directMessages } = data;
    return (
      <div className={classes.root}>
        { messages && (
          <List className={classes.list}>
            {messages.map(message => (
              <ListItem key={message.id} dense button className={classes.listItem}>
                <Avatar alt={message.username}>{message.user.username.charAt(0).toUpperCase()}</Avatar>
                <ListItemText primary={message.created_at} secondary={message.text} />
                <ListItemSecondaryAction>
                  {message.createdAt}
                </ListItemSecondaryAction>
              </ListItem>
          ))}
          </List>
        )}
        {directMessages && (
          <List className={classes.list}>
            {directMessages.map(message => (
              <ListItem key={message.id} dense button className={classes.listItem}>
                <Avatar alt={message.sender.username}>{message.sender.username.charAt(0).toUpperCase()}</Avatar>
                <div>
                  <ListItemText secondary={message.created_at} />
                  <ListItemText primary={message.text} />
                </div>
              </ListItem>
          ))}
          </List>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Messages);
