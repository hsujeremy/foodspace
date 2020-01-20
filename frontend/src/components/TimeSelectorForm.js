import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTime } from "../actions";

// JS Date: 0 refers to Sunday
class TimeSelectorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            endTime: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getCurrentDate() {
        return new Date();
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        // Validate input
        if (!this.state.startTime || !this.state.endTime) return;

        let userIntStart = parseInt(this.state.startTime);
        let userIntEnd = parseInt(this.state.endTime);
        if (Number.isNaN(userIntStart) || Number.isNaN(userIntEnd)) return;
        if (userIntStart < this.props.businessHours.start || userIntEnd > this.props.businessHours.end) {
            console.log('Time does not fit within the business hours for today');
            return;
        }

        // Send to action creator to update store
        this.props.selectTime({ startTime: userIntStart, endTime: userIntEnd });
    }

    renderForm() {
        return (
            <div>
                <label className='userInput'>Start Time: <input name='startTime' type='text' value={this.state.startTime} onChange={this.handleChange} /></label>
                <label className='userInput'>End Time: <input name='endTime' type='text' value={this.state.endTime} onChange={this.handleChange} /></label>
                <button onClick={this.handleSubmit}>Click this</button>
            </div>
        );
    }

    render() {
        if (this.props.businessHours) {
            return (
                <div>
                    <h1>Select a time</h1>
                    <p>Start time: {this.props.businessHours.start}</p>
                    <p>End time: {this.props.businessHours.end}</p>
                    <p>Current Date: {this.getCurrentDate().toUTCString()}</p>
                    <div>{this.renderForm()}</div>
                </div>
            );
        }
        return (
            <div>
                <h3>Uh oh, looks like this place is closed today</h3>
            </div>
        );
    }
}

// Yelp returns hours by day (0: Monday, 1: Tuesday, etc.)
const mapStateToProps = state => {
    let currentDate = new Date();
    if (currentDate.getDay() === 0) {
        return { businessHours: state.selectedPlace.hours[0].open[6] };
    }
    return { businessHours: state.selectedPlace.hours[0].open[currentDate.getDay() - 1] };
};

export default connect(mapStateToProps, { selectTime })(TimeSelectorForm);
