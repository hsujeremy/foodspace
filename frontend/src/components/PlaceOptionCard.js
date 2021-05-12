import React from 'react';
import { connect } from 'react-redux';
import { selectPlace } from '../actions';

function PlaceOptionCard(props) {
    const {
      categories,
      id,
      location,
      name,
      price,
      rating
    } = props.place;

    let ratingText = `${rating} Star${rating === 1 ? '' : 's'}`;

    let categoriesText = '';
    for (let i = 0; i < categories.length; i++) {
      categoriesText += categories[i].title + ', ';
    }
    categoriesText = categoriesText.replace(/,\s*$/, '');

    return (
      <div className="place-option-card">
        <div className="place-metadata">
          <div className="restaurant-name">{name}</div>
          <div>{price}</div>
          <div>{ratingText} · {categoriesText}</div>
          <div>{location.address1}</div>
          <div>
            {location.city}, {location.state}, {location.country}, {location.zip_code}
          </div>
        </div>
        <div className="button" onClick={() => props.selectPlace(id)}>
          Select
        </div>
      </div>
    );
  }

export default connect(undefined, { selectPlace })(PlaceOptionCard);
