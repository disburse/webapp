import React, { Component } from 'react';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import About from './components/About';
//import Error from './components/Error';
//import Navigation from './components/Navigation';
import Disburse from './components/Disburse';
//import Recovery from './components/Recovery';
import './App.css';

class App extends Component {

  componentDidMount = async () => {
    console.log("APP.JS COMPONENT DID MOUNT");
  }

  render() {
    return (
      <div className="App">
          <h2> Disburse.Finance </h2>
          <Disburse></Disburse>
      </div>
    );
  }

  /*
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h2> Disburse.Finance </h2>

          <Navigation />
            <Switch>
              <Route path="/" component={Disburse} exact/>
              <Route path="/recovery" component={Recovery}/>
              <Route path="/about" component={About}/>
              <Route component={Error}/>
            </Switch>
            
        </div>
      </BrowserRouter>
    );
  }
  */
}

export default App;