import React from 'react';
import findIndex from 'lodash/findIndex';
import { Mutation } from 'react-apollo';
import { Button, Input, Typography, FormControl, FormHelperText, Dialog, DialogActions, DialogContent, DialogTitle, Switch } from '@material-ui/core';
import meQuery from '../API/queries/currentUser';
import createChannelMutation from '../API/mutations/createChannel';

const CreateChannel = ({ currentTeamId, state, actions }) => (
  <Mutation
    mutation={createChannelMutation}
    update={(cache, { data: { createChannel } }) => {
      const { ok, channel } = createChannel;
      if (!ok) return;
      const data = cache.readQuery({ query: meQuery });
      const teamIdx = findIndex(data.me.teams, ['id', parseInt(currentTeamId, 10)]);
      data.me.teams[teamIdx].channels.push(channel);
      cache.writeQuery({ query: meQuery, data });
    }}
  >
    {(createChannel) => (
      <Dialog
        open={state.AddChannel}
        onClose={() => actions.toggleModel('AddChannel')}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Channel</DialogTitle>
        <DialogContent style={{ width: '20em', display: 'flex', justifyContent: 'center' }}>
          <FormControl error={!!state.nameError}>
            <Input
              onChange={actions.onInputChange('name')}
              autoFocus
              margin="dense"
              id="newChannel"
              label="Channel Name"
              type="text"
              fullWidth
              style={{ width: '20em' }}
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
          <Button onClick={() => actions.toggleModel('AddChannel')} color="primary">
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

export default CreateChannel;
