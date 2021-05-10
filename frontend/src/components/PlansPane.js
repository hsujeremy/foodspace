import React, { Component } from 'react';
import axios from 'axios';
import { PlanCard } from './PlanCard'

class PlansPane extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { plans: [] };
  }

  componentDidMount() {
    this._isMounted = true;

    // Fetch from server-side Firestore
    axios.get('/get-plans')
      .then(response => {
        this.setState({ plans: response.data })
      })
      .catch(error => console.error(error));
  }

  render() {
    let plansList;
    if (this.state.plans.length === 0) {
      plansList = <div>
                    You don't have any current plans. Start a new search!
                  </div>;
    } else {
      console.log(this.state.plans);
      plansList = this.state.plans.map(plan => {
        return <PlanCard place={plan} />
      });
    }

    return (
      <div className='plans-pane'>
        <h2>Your Plans</h2>
        {plansList}
      </div>
    );
  }
}

export default PlansPane;
