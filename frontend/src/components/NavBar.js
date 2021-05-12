import React from 'react';

import Home from './Home';
import PreviousPlans from './PreviousPlans';
import { resetSearch } from '../actions';
import '../styles.css';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function NavBar({ resetSearch }) {
  return (
    <Router>
      <div>
        <nav>
          <div><Link onClick={() => resetSearch() } to="/">FoodSpace</Link></div>
          <div><Link to="/about">About</Link></div>
          <div><Link to="/plans">Plans</Link></div>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/plans">
            <PreviousPlans />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const About = () => <h1>About</h1>;

export default connect(undefined, { resetSearch })(NavBar);
