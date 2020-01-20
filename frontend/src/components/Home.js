import React, { Component } from 'react';
import { connect } from 'react-redux';
import YelpSearch from './YelpSearch';
import PlaceOptions from './PlaceOptions';
import TimeSelectorForm from './TimeSelectorForm';
import Confirmation from './Confirmation';
import '../styles.css';

class Home extends Component {
    render() {
        if (this.props.selectedTime) {
            return <div className='content'><Confirmation /></div>;
        } else if (this.props.selectedPlace) {
            return <div className='content'><TimeSelectorForm /></div>;
        } else if (this.props.results.length > 0) {
            return <div className='content'><PlaceOptions /></div>;
        }
        return <div className='content'><YelpSearch /></div>
    }
}

const mapStateToProps = state => {
    return {
        results: state.yelpSearchResults,
        selectedPlace: state.selectedPlace,
        selectedTime: state.selectedTime
    }
}

export default connect(mapStateToProps)(Home);