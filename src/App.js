import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomepageLayout from './components/HomepageLayout';
import Disburse from './components/Disburse';
import Future from './components/Future';
import Contact from './components/Contact';
import Error from './components/Error';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        {/* The Switch decides which component to show based on the current URL.*/}
        <Switch> 
            <Route exact path='/' component={HomepageLayout}></Route>
            <Route exact path='/pay' component={Disburse}></Route>
            <Route exact path='/future' component={Future}></Route>
            <Route exact path='/contact' component={Contact}></Route>
            <Route component={Error}/>
        </Switch>
        
      </div>
    );
  }
}

export default App;