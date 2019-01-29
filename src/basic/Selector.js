import React from 'react';
import {Glyphicon} from 'react-bootstrap';

let errorStyle = {
  color:"red",
  topMargin:"5px"
}

export const Selector =  ({ input,label, values,  meta: { touched, error }, initialValue }) => (
  <div>
    <div className="selector-class">
      <select {...input} className="selector-area form-control" value={initialValue}>
        <option>{label}</option>
        {values.map(val => (
          <option value={val}>
            {val}
          </option>
        ))}
      </select>
      <span className="glyphicon glyphicon-chevron-down down-arrow"></span>
    </div>
    {touched && error && <span style={errorStyle}>{error}</span>}
  </div>
)