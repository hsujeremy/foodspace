import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPlace } from '../actions';


// Displays each restaurant search result
// Gives user the option to select (perhaps passes the hours of the day for time?) - figure out later
class PlaceOptionCard extends Component {
    render() {
        const {
            categories,
            id,
            location,
            name,
            price,
            rating
        } = this.props.place;

        let ratingText = rating + ' Star' + (rating === 1 ? '' : 's');

        // let categories = this.props.place.categories;
        let categoriesText = '';
        for (let i = 0; i < categories.length; i++)
            categoriesText += categories[i].title + ', ';
        categoriesText = categoriesText.replace(/,\s*$/, '');

        return (
            <div className='place-option-card'>
                <div className='place-metadata'>
                    <div className='restaurant-name'>{name}</div>
                    <div>{price}</div>
                    <div>{ratingText} · {categoriesText}</div>
                    <div>{location.address1}</div>
                    <div>{location.city}, {location.state}, {location.country}, {location.zip_code}</div>
                </div>
                <div className='button' onClick={() => this.props.selectPlace(id)}>Select</div>
            </div>
        );
    }
}

export default connect(undefined, { selectPlace })(PlaceOptionCard);