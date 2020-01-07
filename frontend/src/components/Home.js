import React, { Component } from 'react';
import YelpSearch from './YelpSearch';
import '../styles.css';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to FoodSpace!</h1>
                <YelpSearch />
            </div>
        );
    }
}

export default Home;