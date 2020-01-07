import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    state = { restaurants: [] }

    componentDidMount() {
        fetch('/yelp').then(res => res.json()).then(restaurants => {
            console.log(restaurants);
            this.setState({ restaurants });
        });
    }

    render() {
        return (
            <div>
                <div>Does this render?</div>
            </div>
        );
    }
}

export default App;
