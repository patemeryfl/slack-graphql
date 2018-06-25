import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Messages, MessageInput } from '../components';

const getDirectMessages = gql`
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

const createDirectMessageMutation = gql`
  mutation($receiverId: Int!, $text: String!) {
    createDirectMessage(receiverId: $receiverId, text: $text)
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
        const response = await submitDirectMessage({ variables: { receiverId: id, text } });
        if (response.data.createDirectMessage) this.setState({ input: '' });
      },
    }
    render() {
      const { classes, user } = this.props;
      return (
        <div className={classes.content} >
          <Toolbar className={classes.toolbar}>
            <Typography variant="headline" color="inherit" noWrap>
              {`Messages with ${user.name}`}
            </Typography>
          </Toolbar>
          <div className={classes.chat} >
            <Query query={getDirectMessages}>
              {({ subscribeToMore, ...result }) => (
                <div />
                // <Messages
                //   {...result}
                //   fetchPolicy="network-only"
                // />
              )}
            </Query>
          </div>
          <Mutation mutation={createDirectMessageMutation}>
            {(createMessage) => (
              <MessageInput
                state={this.state}
                actions={this.actions}
                mutation={createMessage}
                placeholder={user}
              />
            )}
          </Mutation>
        </div>
      );
    }
}

export default withStyles(style)(DirectMessages);
