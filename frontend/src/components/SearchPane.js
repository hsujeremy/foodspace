import React, { Component } from 'react';
import YelpSearchForm from './YelpSearch';
import PlaceOptions from './PlaceOptions';
import TimeSelectorForm from './TimeSelectorForm';
import Confirmation from './Confirmation';
import { connect } from 'react-redux';
import PlaceOptionCard from './PlaceOptionCard';


class SearchPane extends Component {
    renderExamplePlaceOptionCard() {
        return (
            <div className='place-option-card'>
                <div className='place-metadata'>
                    <div className='restaurant-name'>Salt and Straw</div>
                    <div>$$$$</div>
                    <div>5 Stars · Dessert</div>
                    <div>250 University Ave STE 100</div>
                    <div>Palo Alto, CA, 94301</div>
                </div>
                <div className='button'>Select</div>
            </div>
        );
    };

    renderExampleTimeSelectorForm() {
        return (
            <div className='time-selector'>
                <div className='current-timestamp'>
                    <div>Friday · September 25th, 2020</div>
                    <div>8:45 AM · Pacific Standard Time</div>
                </div>
                <div className='hour-status'>Salt and Straw is open today from 10 AM to 9 PM.</div>
                <div className='time-selector-form'>
                    <label className='user-input'>
                        Start: <input type='time' />
                    </label>
                    <label className='user-input' id='end-time-input'>
                        End: <input type='time' />
                    </label>
                    <button>Search</button>
                </div>
            </div>
        );
    }

    render() {
        const {
            results,
            selectedPlace,
            selectedTime
        } = this.props;
        let header;
        console.log(selectedTime)

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
    }
};

const mapStateToProps = state => {
    return {
        results: state.yelpSearchResults,
        selectedPlace: state.selectedPlace,
        selectedTime: state.selectedTime
    }
};

export default connect(mapStateToProps)(SearchPane);