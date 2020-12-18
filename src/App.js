import React, { Component } from 'react';
import Disburse from './components/Disburse';
import './App.css';

//import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import About from './components/About';
//import Error from './components/Error';
//import Navigation from './components/Navigation';
//import Recovery from './components/Recovery';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Disburse />
      </div>
    );
  }
}

export default App;

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