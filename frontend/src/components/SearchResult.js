import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPlace } from '../actions';

// Displays each restaurant search result
// Gives user the option to select (perhaps passes the hours of the day for time?) - figure out later
class SearchResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>{this.props.place.name}</div>
                <div>{this.props.place.price}</div>
                <div>{this.props.place.rating}</div>
                <button onClick={() => this.props.selectPlace(this.props.place)}>Select</button>
            </div>
        );
    }
}

export default connect(undefined, { selectPlace })(SearchResult);