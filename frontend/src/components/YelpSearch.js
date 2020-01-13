import React from 'react';
import '../styles.css';
import { searchYelp } from "../actions";
import { connect } from 'react-redux';

class YelpSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault()

        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        // Create new params object in case state contains unfilled params
        const params = {
            term: this.state.term,
            location: this.state.location.toLowerCase()
        };

        // Come up with better form input handling later
        // Check with Yelp Fusion docs and Postman
        if (params.location) {
            this.props.searchYelp(params);
        }
        console.log('Please enter input for location');
    }

    render() {
        return (
            <div>
                <div>Search for a place</div>
                <label>Term: <input name='term' type='text' value={this.state.term} onChange={this.handleChange} /></label>
                <label>Location: <input name='location' type='text' value={this.state.location} onChange={this.handleChange} /></label>
                <button onClick={this.handleSubmit}>Click this</button>
                <ol>
                    {this.props.results.map(restaurant =>
                        <li key={restaurant.id}>{restaurant.name}, {restaurant.rating}, {restaurant.price}</li>
                    )}
                </ol>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { results: state.yelpSearchResults }
}

export default connect(mapStateToProps, { searchYelp })(YelpSearch);
