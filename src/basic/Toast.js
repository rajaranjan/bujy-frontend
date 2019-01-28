import React, { Component } from "react";

export const Toast = ({ text, classname }) => (
    
    <div className={"toast " + classname}>
    {console.log(text)}
    <p className="toast__content">
      {text}
    </p>
  </div>
)