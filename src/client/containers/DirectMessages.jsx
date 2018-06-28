import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Query, Mutation } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Messages, MessageInput } from '../components';

import directMessagesQuery from '../API/queries/allDirectMessages';
import sendDirectMessageMutation from '../API/mutations/sendDirectMessage';

const style = () => ({
  toolbar: {
    backgroundColor: '#ABCDEF',
  },
  content: {
    width: 'calc(100% - 260px)',
  },
  chat: {
    display: 'flex',
    flexDirection: 'column-reverse',
    overflowY: 'auto',
    backgroundColor: '#ABCDEF',
    marginTop: '0px',
    maxHeight: '400px',
  },
});

class DirectMessages extends Component {
    state = {
      currentChannel: '#general',
      input: '',
    }
    actions = {
      onMessageInputChange: (e) => {
        this.setState({ input: e.target.value });
      },
      handleSubmit: async (receiver, submitDirectMessage) => {
        const { id } = receiver;
        const text = this.state.input;
        if (!this.state.input) return;
        const response = await submitDirectMessage({ variables: { receiverId: id, text, teamId: 1 } });
        if (response.data.createDirectMessage) this.setState({ input: '' });
      },
    }
    render() {
      const { classes, teamId, otherUserId, currentMessageUser } = this.props;
      return (
        <div className={classes.content} >
          <Toolbar className={classes.toolbar}>
            <Typography variant="headline" color="inherit" noWrap>
              {`Messages with ${currentMessageUser}`}
            </Typography>
          </Toolbar>
          <div className={classes.chat} >
            <Query
              query={directMessagesQuery}
              variables={{ teamId, otherUserId }}
              skip={!teamId || !otherUserId}
            >
              {({ subscribeToMore, ...result }) => (
                <Messages
                  {...result}
                />
              )}
            </Query>
          </div>
          <Mutation mutation={sendDirectMessageMutation}>
            {(createDirectMessage) => (
              <MessageInput
                state={this.state}
                actions={this.actions}
                mutation={createDirectMessage}
                placeholder={{ id: otherUserId, name: currentMessageUser }}
              />
            )}
          </Mutation>
        </div>
      );
    }
}

export default withStyles(style)(DirectMessages);
