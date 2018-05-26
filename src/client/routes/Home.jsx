import React, { Component } from 'react';

class Home extends Component {
    state = {
      name: 'Pat Emery',
    }
    render() {
      return (
        <div>Hello {this.state.name}</div>
      );
    }
}

export default Home;
