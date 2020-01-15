import React, { Component } from 'react';
import { connect } from 'react-redux';

class Confirmation extends Component {
    render() {
        return (
            <div>
                <h2>You're all set!</h2>
                <p>{this.props.place}</p>
                <p>{this.props.startTime} - {this.props.endTime}</p>
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
}

export default connect(mapStateToProps)(Confirmation);