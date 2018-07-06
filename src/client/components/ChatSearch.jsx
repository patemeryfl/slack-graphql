import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  container: {
    marginTop: '-10px',
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
    'label + &': {
      marginTop: theme.spacing.unit - 3,
    },
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

const ChatSearch = ({ state, actions, mutation, placeholder, classes }) => (
  <FormControl className={classes.margin}>
    <TextField
      placeholder="Search"
      fullWidth
      onChange={actions.onChatInputChange}
      onKeyDown={(e) => { if (e.key === 'Enter') { actions.handleSubmit(placeholder, mutation); } }}
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

export default withStyles(styles)(ChatSearch);
