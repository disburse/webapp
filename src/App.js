import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Custom React Components
import About from './components/About';
import Error from './components/Error';
import Navigation from './components/Navigation';
import Disburse from './components/Disburse';

import './App.css';
const Web3 = require("web3");

class App extends Component {

  constructor(props){
    super(props);

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
  }

  render() {
    return (

    <BrowserRouter>
      <div className="App">
        <h2> Disburse.Finance </h2>

        <Navigation />
          <Switch>
             <Route path="/" component={Disburse} exact/>
             <Route path="/about" component={About}/>
             <Route component={Error}/>
          </Switch>

      </div>
    </BrowserRouter>

    );
  }
}

export default App;
