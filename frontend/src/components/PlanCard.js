import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetSearch } from '../actions';

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export class PlanCard extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.persist();
    this.props.deletePlan(this.props.place.timeStamp);
  }

  formatTime(timeStr) {
    let hrs = timeStr.split(':')[0];
    let min = timeStr.split(':')[1];
    let end = hrs < 12 ? 'AM' : 'PM';
    if (hrs === 0) {
      hrs = 12;
    } else if (hrs > 12) {
      hrs -= 12;
    }

    hrs = hrs.toString();
    min = min.toString();
    if (min.length < 2) {
      min += '0';
    }
    return `${hrs}:${min} ${end}`.trim();
  };

  formatDate(dateStr) {
    let dateList = dateStr.split('-');
    if (dateList.length < 7) {
      return '';
    }
    let [year, month, day] = dateList.slice(0, 3);
    return `${months[month-1]} ${day}, ${year} ·`;
  };

  render() {
    let startTime = this.formatTime(this.props.place.startTime);
    let endTime = this.formatTime(this.props.place.endTime);
    return (
      <div className='plan-card'>
        <div className='name'>{this.props.place.place}</div>
        <div>
          {this.formatDate(this.props.place.timeStamp)} {startTime} to {endTime}
        </div>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  };
};

const mapStateToProps = (state) => {}

export default connect(mapStateToProps, { resetSearch })(PlanCard);
