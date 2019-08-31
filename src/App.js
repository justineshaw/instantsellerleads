import React, { Component } from "react";
import './App.css';
import axios from './axios';
import SearchBar from './components/SearchBar/SearchBar';
import ValuationResults from "./components/ValuationResults/ValuationResults";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property: "",
      values: "",
      homeDetails: {
        address1: "123 Main St",
        address2: "Charleston, SC 29464",
        beds: 0, 
        baths: 0, 
        sqft: 0},
      showValuation: false
    };
    this.propertySelectedHandler = this.propertySelectedHandler.bind(this);
    this.toggleShowValuation = this.toggleShowValuation.bind(this);
  }

  toggleShowValuation = () => {
    this.setState({
      showValuation: true
    });
  };
  
  propertySelectedHandler = (place) => {
    this.setState({ property: place });

    let data = JSON.parse(JSON.stringify(this.state.property));
    let address_components = data.address_components;
    let base = "https://api.gateway.attomdata.com/propertyapi/v1.0.0/attomavm/detail?";
    let address1 = (
        address_components[0].long_name + " " +
        address_components[1].long_name
      );
    let address2 = (
        address_components[2].long_name + " " +
        address_components[4].short_name + " " +
        address_components[6].long_name
      );
    let url = base + "address1=" + encodeURIComponent(address1) + "&address2=" + encodeURIComponent(address2);
    console.log(url);

    axios({
      method: "get",
      url: url, 
      headers: {
        accept: "application/json",
        apikey: "YOUR_KEY_HERE"
      }
    })
      .then(response => {
        let result = JSON.parse(JSON.stringify(response));
        let values = result.data.property[0].avm.amount;
        let buildingData = result.data.property[0].building;
        let homeDetails = {
          address1: address1,
          address2: address2,
          beds: buildingData.rooms.beds,
          baths: buildingData.rooms.bathstotal,
          sqft: buildingData.size.livingsize
        };
        this.setState({ values: values, homeDetails: homeDetails});
        this.toggleShowValuation();
      })
      .catch(error => {
        console.log("error: " + error);
      });
  };

  render() {
    if (!this.state.showValuation) {
      return (
        <div className="App">
          <SearchBar propertySelectedHandler={(place) => this.propertySelectedHandler(place)} />
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <ValuationResults values={this.state.values} homeDetails={this.state.homeDetails}/>
        </div>
      );
    }
  }
}

export default App;
