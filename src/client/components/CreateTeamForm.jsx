import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const styles = (theme) => ({
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

const CreateTeamForm = ({ createTeam, state, actions, classes }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography variant="display1" gutterBottom>
        Create Team
      </Typography>
      <FormControl
        error={!!state.nameError}
        fullWidth
        className={classes.margin}
      >
        <InputLabel htmlFor="teamname">Team Name</InputLabel>
        <Input
          id="teamname"
          value={state.name}
          onChange={actions.handleChange('name')}
        />
        {state.nameError || state.authError ? (
          <FormHelperText id="name-error-text">
            {state.nameError}
            {state.authError}
          </FormHelperText>
        ) : (
          ''
        )}
      </FormControl>
    </CardContent>
    <CardActions>
      <Button size="large" onClick={createTeam}>
        Create Team
      </Button>
    </CardActions>
  </Card>
);

export default withStyles(styles)(CreateTeamForm);
