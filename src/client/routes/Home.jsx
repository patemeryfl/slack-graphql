import React, { Component } from 'react';
import User from '../components';

class Home extends Component {
    state = {
      name: 'Pat Emery',
    }
    render() {
      return (
        <User />
      );
    }
}

export default Home;
