import React, { Component } from 'react';
import PlaceOptionCard from './PlaceOptionCard';
import { connect } from 'react-redux';

class PlaceOptions extends Component {
    render() {
        return (
            <div>
                <h1>Select a place</h1>
                <ol>
                    {this.props.results.map(restaurant =>
                        <li key={restaurant.id}><PlaceOptionCard place={restaurant}/></li>
                    )}
                </ol>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { results: state.yelpSearchResults };
};

export default connect(mapStateToProps)(PlaceOptions);
