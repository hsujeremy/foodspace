import React from 'react';
import axios from 'axios';
import '../styles.css';

class YelpSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: []
        };

        this.handleButtonPressed = this.handleButtonPressed.bind(this);
    }

    handleButtonPressed(e) {
        e.preventDefault();

        // Create reference to this before API callback
        let component = this;

        const form = new FormData();
        form.append('location', 'san francisco');
        axios.get('/yelp', {
            params: {
                'term': 'mexican',
                'location': 'harvard'
            }
        }).then(response => {
            component.setState({ restaurants: response.data });
        });
    }

    render() {
        return (
            <div>
                <div>Search for Restaurant</div>
                <button onClick={this.handleButtonPressed}>Click this</button>
                <ol>
                    {this.state.restaurants.map(restaurant =>
                        <li key={restaurant.id}>{restaurant.name}, {restaurant.rating}, {restaurant.price}</li>
                    )}
                </ol>
            </div>
        );
    }
}

export default YelpSearch;
