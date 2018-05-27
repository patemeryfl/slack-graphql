import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const styles = {
  list: {
    width: 250,
    padding: 20,
  },
  fullList: {
    width: 'auto',
  },
};

const Menu = ({ state, actions, classes }) => (
  <div>
    <Drawer open={state.showMenu} onClose={actions.showMenu}>
      <div
        tabIndex={0}
        role="button"
        onClick={actions.showMenu}
        onKeyDown={actions.showMenu}
      >
        <div className={classes.list}>
          <List>Channels</List>
          <List>Teams</List>
          <Link to="/register" href="/register">Register</Link>
        </div>
      </div>
    </Drawer>
  </div>
);


export default withStyles(styles)(Menu);
