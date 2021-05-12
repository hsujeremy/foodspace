import React, { Component } from 'react';
import { searchYelp } from '../actions';
import '../styles.css';
import { connect } from 'react-redux';

class YelpSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: 'mexican',
      location: 'harvard',
      price: '1,2'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    // Create new params object in case state contains unfilled params
    let params = {
      term: this.state.term.toLowerCase(),
      location: this.state.location.toLowerCase(),
      sort_by: 'distance',
      price: this.state.price
    };

    // Allow all price range if price is not specified
    if (!this.state.price) {
      const editedParams = {
        ...params,
        price: '1,2,3,4'
      };
      params = editedParams;
    }

    // Come up with better form input handling later
    // Check with Yelp Fusion docs and Postman
    if (params.location) {
      this.props.searchYelp(params);
    }
  }

  render() {
    return (
      <div className="yelp-search-form">
        <label className="user-input">
          Term: <input
                  type="text"
                  name="term"
                  value={this.state.term}
                  onChange={this.handleChange}
                />
        </label>
        <label className="user-input">
          Location: <input
                      type="text"
                      name="location"
                      value={this.state.location}
                      onChange={this.handleChange}
                    />
        </label>
        <label className="user-input">
          Price: <input
                   type="text"
                   name="price"
                   value={this.state.price}
                   onChange={this.handleChange}
                 />
        </label>
        <button onClick={this.handleSubmit}>Search</button>
      </div>
    );
  }
}

export default connect(undefined, { searchYelp })(YelpSearchForm);
