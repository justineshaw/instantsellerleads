import React from 'react';
import formatNum from "format-num";

const ValuationResults = (props) => {
    return (
      <div className="ValuationResults">
        <div className="top">
          <h1>{props.homeDetails.address1}</h1>
          <h1>{props.homeDetails.address2}</h1>
          <h3>
            {props.homeDetails.beds} bds ·{props.homeDetails.baths} ba ·
            {formatNum(props.homeDetails.sqft)} sqft
          </h3>
        </div>

        <div className="middle">
          <p>
            Your Instant Estimate<span></span>${formatNum(props.values.value)}
          </p>
        </div>

        <div className="bottom">
          <p>Your estimate has a Confidence Score of {props.values.scr}%.</p>
          <a href="#">Get a professional valuation, today.</a>
        </div>
      </div>
    );
}

export default ValuationResults;