import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const addTeamMemberMutation = gql`
  mutation($teamId: Int!, $email: String!) {
    addTeamMember(teamId: $teamId, email: $email) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

const AddTeamMember = ({ currentTeamId, state, actions }) => (
  <Mutation mutation={addTeamMemberMutation}>
    {(addTeamMember) => (
      <Dialog
        open={state.openAddTeamMember}
        onClose={actions.toggleAddTeamMember}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Team Member</DialogTitle>
        <DialogContent>
          <FormControl error={!!state.nameError}>
            <Input
              onChange={actions.onAddTeamMemberInputChange('newTeamMemberEmail')}
              autoFocus
              margin="dense"
              id="newTeamMember"
              label="TeamMember"
              type="email"
              fullWidth
            />
            {state.nameError ? <FormHelperText id="name-error-text">{state.nameError}</FormHelperText> : '' }
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={actions.toggleAddTeamMember} color="primary">
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
