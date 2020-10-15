import React, { Component } from 'react';
import SearchPane from './SearchPane';
import PlansPane from './PlansPane';
import '../styles.css';

class Home extends Component {
    render() {
        return (
            <div className='home-content'>
                <h1 className='title'>FoodSpace</h1>
                <div className='double-pane'>
                    <SearchPane />
                    <PlansPane />
                </div>
            </div>
        );
    }
};

export default Home;