import React, { Component } from 'react';
import YelpSearchForm from './YelpSearch';
import PlaceOptions from './PlaceOptions';
import TimeSelectorForm from './TimeSelectorForm';
import Confirmation from './Confirmation';
import { connect } from 'react-redux';


class SearchPane extends Component {
    render() {
        const {
            results,
            selectedPlace,
            selectedTime
        } = this.props;
        let header;

        let content;

        if (selectedTime) {
            header = 'Confirmation Text';
            content = <Confirmation />;
        } else if (selectedPlace) {
            header = 'Select a Time'
            content = <TimeSelectorForm />;
        } else if (results.length !== undefined && results.length > 0) {
            header = 'Select a Place'
            content = <PlaceOptions />;
        } else {
            header = 'Search for a Place'
            content = <YelpSearchForm />;
        }

        return (
            <div className='search-pane'>
                <h2>{header}</h2>
                {content}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        results: state.yelpSearchResults,
        selectedPlace: state.selectedPlace,
        selectedTime: state.selectedTime
    };
};

export default connect(mapStateToProps)(SearchPane);