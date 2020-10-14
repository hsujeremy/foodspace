import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlaceOptions from './PlaceOptions';
import TimeSelectorForm from './TimeSelectorForm';
import Confirmation from './Confirmation';

import SearchPane from './SearchPane';
import PlansPane from './PlansPane';
import '../styles.css';

class Home extends Component {
    render() {
        // if (this.props.selectedTime) {
        //     return <div className='content'><Confirmation /></div>;
        // } else if (this.props.selectedPlace) {
        //     return <div className='content'><TimeSelectorForm /></div>;
        // } else if (this.props.results.length > 0) {
        //     return <div className='content'><PlaceOptions /></div>;
        // }
        // return <div className='content'><YelpSearch /></div>
        return (
            <div className='home-content'>
                <h1 className='title'>FoodSpace</h1>
                <div className='double-pane'>
                    <SearchPane />
                    <PlansPane />
                </div>
            </div>
        );
    }
};

// const mapStateToProps = state => {
//     return {
//         results: state.yelpSearchResults,
//         selectedPlace: state.selectedPlace,
//         selectedTime: state.selectedTime
//     }
// };

// export default connect(mapStateToProps)(Home);

export default Home;