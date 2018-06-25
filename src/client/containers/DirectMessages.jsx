import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Messages, MessageInput } from '../components';

const directMessagesQuery = gql`
  query($teamId: Int!, $otherUserId: Int!) {
    directMessages(teamId: $teamId, otherUserId: $otherUserId) {
      id
      sender {
        username
      }
      text
      created_at
    }
  }
`;

const createDirectMessageMutation = gql`
  mutation($receiverId: Int!, $text: String!, $teamId: Int!) {
    createDirectMessage(receiverId: $receiverId, text: $text, teamId: $teamId)
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
        const response = await submitDirectMessage({ variables: { receiverId: id, text, teamId: 1 } });
        if (response.data.createDirectMessage) this.setState({ input: '' });
      },
    }
    render() {
      const { classes, teamId, otherUserId } = this.props;
      return (
        <div className={classes.content} >
          <Toolbar className={classes.toolbar}>
            <Typography variant="headline" color="inherit" noWrap>
              {'Messages with a person'}
            </Typography>
          </Toolbar>
          <div className={classes.chat} >
            <Query query={directMessagesQuery} variables={{ teamId, otherUserId }}>
              {({ subscribeToMore, ...result }) => (
                <Messages
                  {...result}
                  fetchPolicy="network-only"
                />
              )}
            </Query>
          </div>
          <Mutation mutation={createDirectMessageMutation}>
            {(createDirectMessage) => (
              <MessageInput
                state={this.state}
                actions={this.actions}
                mutation={createDirectMessage}
                placeholder={{ id: otherUserId }}
              />
            )}
          </Mutation>
        </div>
      );
    }
}

export default withStyles(style)(DirectMessages);
