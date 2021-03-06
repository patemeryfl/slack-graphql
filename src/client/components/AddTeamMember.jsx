import React from 'react';
import { Mutation } from 'react-apollo';
import { Button, Input, FormControl, FormHelperText, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import addTeamMemberMutation from '../API/mutations/addTeamMember';

const AddTeamMember = ({ currentTeamId, state, actions }) => (
  <Mutation mutation={addTeamMemberMutation}>
    {(addTeamMember) => (
      <Dialog
        open={state.AddTeamMember}
        onClose={() => actions.toggleModel('AddTeamMember')}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Team Member</DialogTitle>
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
          <Button onClick={() => actions.toggleModel('AddTeamMember')} color="primary">
          Cancel
          </Button>
          <Button onClick={() => actions.addTeamMember(currentTeamId, addTeamMember)} color="primary">
          Add
          </Button>
        </DialogActions>
      </Dialog>
    )}
  </Mutation>
);

export default AddTeamMember;
