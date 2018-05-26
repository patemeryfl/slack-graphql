import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Header, Footer } from './components';
import Home from './routes';

const App = () => (
  <Router>
    <Fragment>
      <Route exact path="/" component={Home} />
    </Fragment>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

module.hot.accept();
