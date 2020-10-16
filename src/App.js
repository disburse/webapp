import React, { Component } from 'react';
import './App.css';

const Web3 = require("web3");
const ethEnabled = () => {

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    window.ethereum.enable();
    return true;
  }
  return false;
}

if (!ethEnabled()) {
  alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
}
else{
  alert("Compatible browser found.");
}

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1> It begins... </h1>
      </div>
    );
  }
}

export default App;
