import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Query, Mutation } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Messages, MessageInput } from '../components';

import directMessagesQuery from '../API/queries/allDirectMessages';
import sendDirectMessageMutation from '../API/mutations/sendDirectMessage';
import newDirectMessageSubscription from '../API/subscriptions/newDirectMessage';

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
        const { id, teamId } = receiver;
        const text = this.state.input;
        if (!this.state.input) return;
        const response = await submitDirectMessage({ variables: { receiverId: id, text, teamId } });
        if (response.data.sendDirectMessage) this.setState({ input: '' });
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
                  type="directMessages"
                  currentChannel={otherUserId}
                  fetchPolicy="network-only"
                  subscribeToMessages={() =>
                    subscribeToMore({
                      document: newDirectMessageSubscription,
                      variables: { teamId, userId: otherUserId },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData) return prev;
                        if (subscriptionData.errors) return subscriptionData.errors.map(e => console.log(e.message));
                        return { ...prev, directMessages: [...prev.directMessages, subscriptionData.data.newDirectMessage] };
                      },
                    })
                  }
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
                placeholder={{ id: otherUserId, teamId, name: currentMessageUser }}
              />
            )}
          </Mutation>
        </div>
      );
    }
}

export default withStyles(style)(DirectMessages);
