import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
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

        // fetch('/yelp', {
        //     method: 'POST'
        // })
        //     .then(res => res.json())
        //     .then(restaurants => {
        //     console.log(restaurants);
        //     component.setState({ restaurants });
        // });
        axios.get('/yelp', {
            params: {
                'term': 'mexican',
                'location': 'harvard'
            }
        }).then(restaurants => {
            component.setState({ restaurants })
            console.log(component.state.restaurants.data);
        });
    }

    render() {
        return (
            <div>
                <div>FoodSpace</div>
                <button onClick={this.handleButtonPressed}>Click this</button>
            </div>
        );
    }
}

export default App;
