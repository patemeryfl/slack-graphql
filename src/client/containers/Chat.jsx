import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Messages, MessageInput } from '../components';

const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

const allMessagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

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
            <Query query={allMessagesQuery} variables={{ channelId }}>
              {({ subscribeToMore, ...result }) => (
                <Messages
                  {...result}
                  currentChannel={currentChannel}
                  subscribeToMessages={(id) =>
                    subscribeToMore({
                      document: newChannelMessageSubscription,
                      variables: { channelId: id },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData) return prev;
                        return { ...prev, messages: [...prev.messages, subscriptionData.data.newChannelMessage] };
                      },
                    })
                  }
                />
              )}
            </Query>
          </div>
          <Mutation mutation={createMessageMutation}>
            {(createMessage) => (
              <MessageInput
                state={this.state}
                actions={this.actions}
                mutation={createMessage}
                currentChannel={currentChannel}
              />
            )}
          </Mutation>
        </div>
      );
    }
}

export default withStyles(style)(Chat);
