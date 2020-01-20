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
            return <Confirmation />;
        } else if (this.props.selectedPlace) {
            return <TimeSelectorForm />;
        } else if (this.props.results.length > 0) {
            return <PlaceOptions />;
        }
        return <YelpSearch />;
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