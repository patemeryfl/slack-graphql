import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  container: {
    width: '100vh',
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    borderRadius: '5px',
    margin: theme.spacing.unit,
    width: '100vh',
  },
  bootstrapRoot: {
    padding: '20px',
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
    width: 'calc(100% + 250px)',
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

const MessageInput = ({ state, actions, mutation, currentChannel, classes }) => (
  <FormControl className={classes.margin}>
    <TextField
      placeholder={`Message #${currentChannel.name}`}
      fullWidth
      onChange={actions.onMessageInputChange}
      onKeyDown={(e) => { if (e.key === 'Enter') { actions.handleSubmit(currentChannel, mutation); } }}
      value={state.input}
      InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.bootstrapRoot,
            input: classes.bootstrapInput,
          },
        }}
      InputLabelProps={{
          shrink: true,
          className: classes.bootstrapFormLabel,
        }}
    />
  </FormControl>
);

export default withStyles(styles)(MessageInput);
