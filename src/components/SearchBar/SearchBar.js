import React from 'react';
import Autocomplete from "react-google-autocomplete";

const SearchBar = (props) => {
    return (
      <div className="SearchBar">
        <h1>How much is your home worth?</h1>
        <Autocomplete
          style={{ width: "50%" }}
          onPlaceSelected={props.propertySelectedHandler}
          types={["address"]}
          componentRestrictions={{ country: "us" }}
          placeholder={"Enter a home address"}
        />
      </div>
    );
}

export default SearchBar;