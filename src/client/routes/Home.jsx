import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../components';

class Home extends Component {
    state = {
      name: 'Pat Emery',
    }
    render() {
      return (
        <div style={{ marginTop: '70px' }}>
          <Link to="/login" href="/login">Log In</Link>
          <Link to="/register" href="/register">Register</Link>
          <p>Users Works</p>
          <User />
        </div>
      );
    }
}

export default Home;
