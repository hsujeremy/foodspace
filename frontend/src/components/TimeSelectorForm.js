import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { selectTime } from '../actions';


class TimeSelectorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businessStart: '',
            businessEnd: '',
            userStart: '',
            userEnd: '',
            submitStatus: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        // Make sure to handle time validation
        // Deal with business hours later
        let localSubmitStatus = '';
        if (this.state.userStart.length === 0 || this.state.userEnd.length === 0)
            localSubmitStatus = 'Fields are required.';
        else if (this.state.userStart > this.state.userEnd)
            localSubmitStatus = 'Start time must precede end time.';

        this.setState({submitStatus: localSubmitStatus}, () => {
            if (this.state.submitStatus.length > 0)
                return;
            // Send to action creator to update client-side store
            this.props.selectTime({ startTime: this.state.userStart, endTime: this.state.userEnd });

            // Save to Cloud Firestore on server-side
            let currentDate = new Date()
            let formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
            let formattedTime = `${currentDate.getHours()}-${currentDate.getMinutes() + 1}-${currentDate.getSeconds()}-${currentDate.getMilliseconds()}`;
            let planIdentifier = `${formattedDate}-${formattedTime}`;
            axios.get('/confirm-plan', {
                params: {
                    place: this.props.place,
                    startTime: this.state.userStart,
                    endTime: this.state.userEnd,
                    timeStamp: planIdentifier
                }
            })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        });
    };

    findTimeDifference(startStr, endStr) {
        let date1 = new Date(2001, 0, 15, startStr.substring(0, 2), startStr.substring(2), 0);
        let date2 = new Date(2001, 0, 15, endStr.substring(0, 2), endStr.substring(2), 0);
        let diff = Math.abs(date1 - date2);

        let ms = parseInt((diff % 1000) / 100);
        let sec = Math.floor((diff / 1000) % 60);
        let min = Math.floor((diff / (1000 * 60)) % 60);
        let hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);

        return [hrs, min, sec, ms];
    };

    formatTime(hrs, min, isTwelve) {
        let end = '';
        if (isTwelve) {
            end = hrs < 12 ? 'AM' : 'PM';
            if (hrs < 12) {
                if (hrs == 0)
                    hrs += 12;
                end = 'AM';
            } else {
                hrs -= 12;
                end = 'PM';
            }
        }
        // Need to handle case where the 0 is preceding
        hrs = hrs.toString();
        min = min.toString();
        if (min.length < 2)
            min += '0';
        return `${hrs}:${min} ${end}`.trim();
    };

    render() {
        // Make sure users are using Chrome
        let [currMonth, currDate, currYear] = ( new Date() ).toLocaleDateString().split('/');
        let bHoursTxt;

        if (this.props.hours === undefined)
            bHoursTxt = `${this.props.place} is currently not open. Check back again tomorrow!`;
        // else {
            // let startStr = this.props.hours.start;
            // let endStr = this.props.hours.end;
            // if (this.props.hours.is_overnight)
            //     endStr = (parseInt(endStr) + 2400).toString();

            let startStr = '1000';
            let endStr = '2700';

            let timeDiff = this.findTimeDifference(startStr, endStr);
            let bStart = new Date(currYear, currMonth - 1, currDate, parseInt(startStr.substring(0, 2)), parseInt(startStr.substring(2)), 0);
            let bEnd = new Date(bStart.getTime());
            bEnd.setHours(bEnd.getHours() + timeDiff[0]);
            bEnd.setMinutes(bEnd.getMinutes() + timeDiff[1]);

            let bStartTimeTxt = this.formatTime(bStart.getHours(), bStart.getMinutes(), true);
            let bEndTimeTxt = this.formatTime(bEnd.getHours(), bEnd.getMinutes(), true);
            let bStartTxt = `${bStartTimeTxt} today`;
            let bEndTxt = `${bEndTimeTxt} ${bEnd.getDate() != bStart.getDate() ? 'tomorrow' : 'today'}`;

            bHoursTxt = `${this.props.place} is open from ${bStartTxt} to ${bEndTxt}.`;

            bStartTimeTxt = this.formatTime(bStart.getHours(), bStart.getMinutes(), false);
            bEndTimeTxt = this.formatTime(bEnd.getHours(), bEnd.getMinutes(), false);

            // Only allow them to pick times in a single day for now
            if (bEndTimeTxt > '23:59')
                bEndTimeTxt = '23:59';
        // }

        return (
            <div className='time-selector'>
                <div className='hour-status'>{bHoursTxt}</div>
                <div className='time-selector-form'>
                    <label className='user-input'>
                        Start: <input type='time'
                                      name='userStart'
                                      value={this.state.userStart}
                                      onChange={this.handleChange}
                                      min={bStartTimeTxt}
                                      max={bEndTimeTxt} />
                    </label>
                    <label className='user-input' id='end-time-input'>
                        End: <input type='time'
                                    name='userEnd'
                                    value={this.state.userEnd}
                                    onChange={this.handleChange}
                                    min={bStartTimeTxt}
                                    max={bEndTimeTxt} />
                    </label>
                    <button onClick={this.handleSubmit}>Confirm Time</button>
                    <div>{this.state.submitStatus}</div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    let place = state.selectedPlace;

    let yelpDayIndex = ( new Date () ).getDay() - 1;
    if (yelpDayIndex < 0)
        yelpDayIndex = 6;

    let props = {
        place: place.name
    };

    if (place.is_closed)
        return {
            ...props,
            hours: null
        };
    return {
        ...props,
        hours: place.hours[yelpDayIndex]
    };
};

export default connect(mapStateToProps, { selectTime })(TimeSelectorForm);