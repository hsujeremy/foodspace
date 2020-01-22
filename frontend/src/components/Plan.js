import React from 'react';

export const Plan = props => (
    <div>
        <h3>{props.place}</h3>
        <p>{props.startTime} - {props.endTime}</p>
    </div>
);