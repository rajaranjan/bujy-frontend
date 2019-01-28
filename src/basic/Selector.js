import React from 'react';
import {Glyphicon} from 'react-bootstrap';


const ratings = [
    1,2,3,4,5
]
let errorStyle = {
  color:"red",
  topMargin:"5px"
}

export const Selector =  ({ input,label, meta: { touched, error }, initialValue }) => (
    <span>
      <select {...input} className="form-control" value={initialValue}>
        <option>{label}.</option>
        {ratings.map(val => (
          <option value={val}>
            {val}
          </option>
        ))}
      </select>
      <Glyphicon className="chevron-down"></Glyphicon>
      {touched && error && <span style={errorStyle}>{error}</span>}
    </span>
)