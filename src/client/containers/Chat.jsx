import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Query, Mutation } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Messages, MessageInput } from '../components';

import allChatMessagesQuery from '../API/queries/allChatMessages';
import newChannelMessageSubscription from '../API/subscriptions/newChannelMessage';
import sendChatMessageMutation from '../API/mutations/sendChatMessage';

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

class Chat extends Component {
    state = {
      currentChannel: '#general',
      input: '',
    }
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
      const { classes, currentChannel } = this.props;
      const channelId = currentChannel.id;
      return (
        <div className={classes.content} >
          <Toolbar className={classes.toolbar}>
            <Typography variant="headline" color="inherit" noWrap>
              {`#${currentChannel.name}`}
            </Typography>
          </Toolbar>
          <div className={classes.chat} >
            <Query query={allChatMessagesQuery} variables={{ channelId }}>
              {({ subscribeToMore, ...result }) => (
                <Messages
                  {...result}
                  type="chatMessages"
                  currentChannel={currentChannel}
                  fetchPolicy="network-only"
                  subscribeToMessages={(id) =>
                    subscribeToMore({
                      document: newChannelMessageSubscription,
                      variables: { channelId: id },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData) return prev;
                        if (subscriptionData.errors) return subscriptionData.errors.map(e => console.log(e.message));
                        return { ...prev, messages: [...prev.messages, subscriptionData.data.newChannelMessage] };
                      },
                    })
                  }
                />
              )}
            </Query>
          </div>
          <Mutation mutation={sendChatMessageMutation}>
            {(createMessage) => (
              <MessageInput
                state={this.state}
                actions={this.actions}
                mutation={createMessage}
                placeholder={currentChannel}
              />
            )}
          </Mutation>
        </div>
      );
    }
}

export default withStyles(style)(Chat);
