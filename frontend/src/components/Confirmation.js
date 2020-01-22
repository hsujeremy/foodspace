import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetSearch } from "../actions";

class Confirmation extends Component {
    render() {
        return (
            <div>
                <h1>You're all set!</h1>
                <p>{this.props.place}</p>
                <p>{this.props.startTime} - {this.props.endTime}</p>
                <button onClick={() => this.props.resetSearch()}>New Search</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        place: state.selectedPlace.name,
        startTime: state.selectedTime.startTime,
        endTime: state.selectedTime.endTime
    };
};

export default connect(mapStateToProps, { resetSearch })(Confirmation);