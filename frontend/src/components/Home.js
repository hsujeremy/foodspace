import React, { Component } from 'react';

import SearchPane from './SearchPane';
import PlansPane from './PlansPane';
import '../styles.css';

import { connect } from 'react-redux';
import { resetSearch } from '../actions';

class Home extends Component {
  render() {
    return (
      <div className="home-content">
        <h1 id="title" onClick={() => this.props.resetSearch()}>FoodSpace</h1>
        <div className="double-pane">
          <SearchPane />
          <PlansPane />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, { resetSearch })(Home);
