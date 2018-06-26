import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, FormControl, FormHelperText, InputLabel, InputAdornment, Input, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  card: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
});

const RegisterForm = ({ submit, state, actions, classes }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography variant="display1" gutterBottom>
        Register
      </Typography>
      <FormControl error={!!state.usernameError} fullWidth className={classes.margin}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input id="username" value={state.username} onChange={actions.handleChange('username')} />
        {state.usernameError ? <FormHelperText id="name-error-text">{state.usernameError}</FormHelperText> : '' }
      </FormControl>
      <FormControl error={!!state.emailError} fullWidth className={classes.margin}>
        <InputLabel htmlFor="email">E-Mail</InputLabel>
        <Input id="email" value={state.email} onChange={actions.handleChange('email')} />
        {state.emailError ? <FormHelperText id="name-error-text">{state.emailError}</FormHelperText> : '' }
      </FormControl>
      <FormControl error={!!state.passwordError} className={classNames(classes.margin, classes.textField)}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          type={state.showPassword ? 'text' : 'password'}
          value={state.password}
          onChange={actions.handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={actions.handleClickShowPassword}
                onMouseDown={actions.handleMouseDownPassword}
              >
                {state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
      }
        />
        {state.passwordError ? <FormHelperText id="name-error-text">{state.passwordError}</FormHelperText> : '' }
      </FormControl>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={actions.clearForm}>Clear</Button>
      <Button size="small" onClick={submit}>Submit</Button>
    </CardActions>
  </Card>
);

export default withStyles(styles)(RegisterForm);
