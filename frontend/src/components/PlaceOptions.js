import React, { Component } from 'react';
import PlaceOptionCard from './PlaceOptionCard';
import { connect } from 'react-redux';

class PlaceOptions extends Component {
  render() {
    return (
      <div>
        {this.props.results.map(restaurant =>
          <PlaceOptionCard place={restaurant} key={restaurant.id} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { results: state.yelpSearchResults };
};

export default connect(mapStateToProps)(PlaceOptions);
