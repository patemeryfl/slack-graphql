import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
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

const LogInForm = ({ register, signin, state, actions, classes }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography variant="display1" gutterBottom>
        Log In
      </Typography>
      <FormControl error={!!state.usernameError} fullWidth className={classes.margin}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input id="username" value={state.username} onChange={actions.handleChange('username')} />
        {state.usernameError ? <FormHelperText id="name-error-text">{state.usernameError}</FormHelperText> : '' }
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
      <Button size="small" onClick={signin}>Sign In</Button>
      <Button size="small" onClick={register}>Register</Button>
    </CardActions>
  </Card>
);

export default withStyles(styles)(LogInForm);
