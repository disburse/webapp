import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import DisburseHeader from './components/Header';
import DisburseFooter from './components/Footer';
import Home from './components/Home';
import Disburse from './components/Disburse';
import Error from './components/Error';

const Main = () => {
  return (
    <div>
        <DisburseHeader />
            <Container style={{ marginTop: '4em' }}>
                {/* The Switch decides which component to show based on the current URL.*/}
                <Switch> 
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/pay' component={Disburse}></Route>
                    <Route component={Error}/>
                </Switch>
            </Container>
        <DisburseFooter />
    </div>
  );
}

export default Main;