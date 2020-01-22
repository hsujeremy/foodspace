import React, { Component } from 'react';
import { Plan } from './Plan';
import axios from 'axios';

class PreviousPlans extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = { plans: [] };
    }

    componentDidMount() {
        this._isMounted = true;

        // Fetch plans from server-side Firestore
        axios.get('/get-plans')
            .then(response => {
                this.setState({ plans: response.data });
            })
            .catch(error => console.error(error));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        console.log('From render: ' + this.state.plans + this.state.something);
        return (
            <div>
                <h1>Previous Plans</h1>
                <ol>
                    {this.state.plans.map(plan =>
                        <li key={plan.timeStamp}>
                            <Plan place={plan.place}
                                  startTime={plan.startTime}
                                  endTime={plan.endTime} />
                        </li>
                    )}
                </ol>
            </div>
        );
    }
}

export default PreviousPlans;
