import React from 'react';
import '../styles.css';
import { searchYelp } from "../actions";
import { connect } from 'react-redux';
import SearchResult from './SearchResult';
import TimeSelector from './TimeSelector.js';
import Confirmation from './Confirmation';

class YelpSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: 'mexican',
            location: 'harvard',
            price: '1,2'
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
            }
            params = editedParams;
        }

        // Come up with better form input handling later
        // Check with Yelp Fusion docs and Postman
        if (params.location) {
            this.props.searchYelp(params);
        }
        console.log('Please enter input for location');
    }

    // Renders the Yelp search form
    renderForm() {
        return (
            <div>
                <label className='userInput'>Term: <input name='term' type='text' value={this.state.term} onChange={this.handleChange} /></label>
                <label className='userInput'>Location: <input name='location' type='text' value={this.state.location} onChange={this.handleChange} /></label>
                <label className='userInput'>Price: <input name='price' type='text' value={this.state.price} onChange={this.handleChange} /></label>
                <button onClick={this.handleSubmit}>Click this</button>
            </div>
        );
    }

    render() {
        // TODO: Refractor everything to a giant switch statement
        // User has not selected a place yet
        if (!this.props.selectedPlace) {
            return (
                <div>
                    <div>Search for a place</div>
                    {this.renderForm()}
                    <ol>
                        {this.props.results.map(restaurant =>
                            <li key={restaurant.id}><SearchResult place={restaurant}/></li>
                        )}
                    </ol>
                </div>
            );
        } else if (this.props.selectedTime) {
            return (
                <div>
                    <Confirmation />
                </div>
            );
        }
        return (
            <div>
                <TimeSelector />
            </div>
        );
    }
}

const mapStateToProps = state => {
    if (state.selectedPlace) {
        console.log(state.selectedPlace.hours[0].open[0].start);
    }
    return {
        results: state.yelpSearchResults,
        selectedPlace: state.selectedPlace,
        selectedTime: state.selectedTime
    };
};

export default connect(mapStateToProps, { searchYelp })(YelpSearch);
