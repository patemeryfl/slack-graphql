import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const styles = {
  list: {
    width: 250,
    padding: 20,
    a: {
      textDecoration: 'none',
    },
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
          <List>
            <ListItem button>
              <Link to="/createchannel" href="/createchannel">
                <ListItemText primary="Create Channel" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/createteam" href="/createteam">
                <ListItemText primary="Create Team" />
              </Link>
            </ListItem>
            <Divider />
            <ListItem button>
              <Link to="/allchannels" href="/allchannels">
                <ListItemText primary="View All Channels" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/viewteam" href="/allteams">
                <ListItemText primary="View All Teams" />
              </Link>
            </ListItem>
          </List>
        </div>
      </div>
    </Drawer>
  </div>
);

export default withStyles(styles)(Menu);
