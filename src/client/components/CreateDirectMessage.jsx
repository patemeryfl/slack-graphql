import React from 'react';
import { Mutation } from 'react-apollo';
import { Button, Input, FormControl, FormHelperText, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { findIndex } from 'lodash';
import createDirectMessageMutation from '../API/mutations/createDirectMessage';
import meQuery from '../API/queries/currentUser';

const CreateDirectMessage = ({ currentTeamId, state, actions }) => (
  <Mutation
    mutation={createDirectMessageMutation}
    update={(cache, { data: { createDirectMessage } }) => {
      const { id, username } = createDirectMessage.user;
      const data = cache.readQuery({ query: meQuery });
      const teamIdx = findIndex(data.me.teams, ['id', parseInt(currentTeamId, 10)]);
      const notAlreadyThere = data.me.teams[teamIdx].directMessageMembers.every(member => member.id !== id);
      if (notAlreadyThere) {
        data.me.teams[teamIdx].directMessageMembers.push({ __typename: 'User', id, username });
      }
      cache.writeQuery({ query: meQuery, data });
    }}
  >
    {(createDirectMessage) => (
      <Dialog
        open={state.CreateDirectMessage}
        onClose={() => actions.toggleModel('CreateDirectMessage')}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Direct Message</DialogTitle>
        <DialogContent style={{ width: '20em', display: 'flex', justifyContent: 'center' }}>
          <FormControl error={!!state.nameError}>
            <Input
              onChange={actions.onInputChange('email')}
              autoFocus
              margin="dense"
              id="newTeamMember"
              label="TeamMember"
              type="email"
              fullWidth
              style={{ width: '20em' }}
            />
            {state.nameError ? <FormHelperText id="name-error-text">{state.nameError}</FormHelperText> : '' }
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => actions.toggleModel('CreateDirectMessage')} color="primary">
          Cancel
          </Button>
          <Button onClick={() => actions.createDirectMessage(currentTeamId, createDirectMessage)} color="primary">
          Start Messaging!
          </Button>
        </DialogActions>
      </Dialog>
    )}
  </Mutation>
);

export default CreateDirectMessage;
