import React from 'react';
import { Mutation } from 'react-apollo';
import { Button, Input, FormControl, FormHelperText, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import newDirectMessageMutation from '../API/mutations/newDirectMessage';

const NewDirectMessage = ({ currentTeamId, state, actions }) => (
  <Mutation mutation={newDirectMessageMutation}>
    {(newDirectMessage) => (
      <Dialog
        open={state.NewDirectMessage}
        onClose={() => actions.toggleModel('NewDirectMessage')}
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
          <Button onClick={() => actions.toggleModel('NewDirectMessage')} color="primary">
          Cancel
          </Button>
          <Button onClick={() => actions.addTeamMember(currentTeamId, newDirectMessage)} color="primary">
          Start Messaging!
          </Button>
        </DialogActions>
      </Dialog>
    )}
  </Mutation>
);

export default NewDirectMessage;
