import React, { Component } from 'react';
import axios from 'axios';
import { PlanCard } from './PlanCard'

class PlansPane extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { plans: [] };
    this.deletePlan = this.deletePlan.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    axios.get('/get-plans')
      .then(response => {
        this.setState({ plans: response.data })
      })
      .catch(error => console.error(error));
  }

  async deletePlan(timeStamp) {
    let response;
    try {
      response = await axios.get('/delete-plan', {
        params: {
          timeStamp: timeStamp
        }
      });
    } catch (error) {
      console.log(error);
      return;
    }

    this.setState({
      plans: this.state.plans.filter(plan => plan.timeStamp !== timeStamp)
    });
  }

  render() {
    let plansList;
    if (this.state.plans.length === 0) {
      plansList = <div>
                    You don't have any current plans. Start a new search!
                  </div>;
    } else {
      plansList = this.state.plans.map(plan => {
        return <PlanCard place={plan} deletePlan={this.deletePlan} />
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
