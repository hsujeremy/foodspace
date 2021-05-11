import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetSearch } from '../actions';

class Confirmation extends Component {
  formatTime(timeStr) {
    let hrs = parseInt(timeStr.split(':')[0]);
    let min = timeStr.split(':')[1];
    let end = '';
    end = hrs < 12 ? 'AM' : 'PM';
    if (hrs === 0) {
        hrs = 12;
    } else if (hrs > 12) {
        hrs -= 12;
    }

    hrs = hrs.toString();
    return `${hrs}:${min} ${end}`.trim();
  };

  render() {
    let formattedStart = this.formatTime(this.props.startTime);
    let formattedEnd = this.formatTime(this.props.endTime);
    let message = `You're all set for ${this.props.place} from ` +
                  `${formattedStart} to ${formattedEnd}!`;
    return (
      <div>
        <div>{message}</div>
        <button onClick={() => this.props.resetSearch()}>New Search</button>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    place: state.selectedPlace.name,
    startTime: state.selectedTime.startTime,
    endTime: state.selectedTime.endTime
  };
};

export default connect(mapStateToProps, { resetSearch })(Confirmation);
