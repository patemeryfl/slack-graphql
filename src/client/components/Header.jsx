import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    fontWeight: 'bold',
  },
  header: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const Header = ({ state, actions, classes }) => (
  <div className={classes.root}>
    <AppBar position="absolute" className={classes.header}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon onClick={actions.showMenu} />
        </IconButton>
        <Typography variant="headline" color="inherit" className={classes.flex}>
          Slack Client
        </Typography>
        <Button color="inherit">
          {!state.loggedIn ?
            <Link to="/login" href="/login">Log In</Link> :
            <span onClick={actions.logOut} onKeyPress={actions.logOut} role="link" tabIndex={0} >Log Out</span>
          }
        </Button>
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(Header);
