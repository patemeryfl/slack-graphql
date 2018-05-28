import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { Teams, Channels } from '../components';

const allTeamsQuery = gql`
{
  allTeams {
    id
    name
    channels {
      id
      name
    }
  }
}
`;

const style = theme => ({
  sidebar: {
    marginTop: '30px',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    backgroundColor: theme.palette.background.default,
  },
});

class SideBar extends Component {
    state = {
      teamName: 'Team Name',
      userName: 'Pat Emery',
      channels: [
        { id: 1, name: '#general' },
        { id: 2, name: '#random' },
      ],
      teams: [
        { id: 1, name: 'FD' },
        { id: 2, name: 'PE' },
      ],
      directMessages: [
        { id: 1, sender: 'Mike' },
        { id: 2, sender: 'Steve' },
      ],
    }
    actions = {
      navigate: () => {},
    }
    render() {
      const { classes } = this.props;
      return (
        <Drawer variant="permanent" className={classes.sidebar}>
          <Query query={allTeamsQuery}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                return (
                  <div className={classes.inner}>
                    <Teams teams={data.teams} state={this.state} actions={this.actions} />
                    <Channels channels={data.channels} state={this.state} actions={this.actions} />
                  </div>
                );
            }}
          </Query>
        </Drawer>
      );
    }
}

export default withStyles(style)(SideBar);
