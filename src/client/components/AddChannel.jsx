import React from 'react';
import gql from 'graphql-tag';
import findIndex from 'lodash/findIndex';
import { Mutation } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import allTeamsQuery from '../queries/team';

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!, $public: Boolean!) {
    createChannel(teamId: $teamId, name: $name, public: $public) {
      ok
      channel {
        id
        name
      }
      errors {
        path
        message
      }
    }
  }
`;

const AddChannel = ({ currentTeamId, state, actions }) => (
  <Mutation
    mutation={createChannelMutation}
    update={(cache, { data: { createChannel } }) => {
      const { ok, channel } = createChannel;
      if (!ok) return;
      const data = cache.readQuery({ query: allTeamsQuery });
      const teamIdx = findIndex(data.allTeams, ['id', parseInt(currentTeamId, 10)]);
      data.allTeams[teamIdx].channels.push(channel);
      cache.writeQuery({ query: allTeamsQuery, data });
    }}
  >
    {(createChannel) => (
      <Dialog
        open={state.openAddChannel}
        onClose={actions.toggleAddChannel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Channel</DialogTitle>
        <DialogContent>
          <FormControl error={!!state.nameError}>
            <Input
              onChange={actions.onChannelInputChange('name')}
              autoFocus
              margin="dense"
              id="newChannel"
              label="Channel Name"
              type="text"
              fullWidth
            />
            {state.nameError ? <FormHelperText id="name-error-text">{state.nameError}</FormHelperText> : '' }
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Typography>Public Channel?</Typography>
          <Switch
            checked={state.isPublicChannel}
            onChange={actions.onChannelTypeChange('isPublic')}
            value="isPublic"
            color="primary"
          />
        </DialogActions>
        <DialogActions>
          <Button onClick={actions.toggleAddChannel} color="primary">
          Cancel
          </Button>
          <Button onClick={() => actions.addChannel(currentTeamId, createChannel)} color="primary">
          Add
          </Button>
        </DialogActions>
      </Dialog>
    )}
  </Mutation>
);

export default AddChannel;
