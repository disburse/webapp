import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import DisburseHeader from './components/Header';
import DisburseFooter from './components/Footer';
import Disburse from './components/Disburse';
import Faq from './components/Faq';

const Main = () => {
  return (
    <div>
        <DisburseHeader />
            <Container style={{ marginTop: '4em' }}>
                <Switch> {/* The Switch decides which component to show based on the current URL.*/}
                    <Route exact path='/' component={Disburse}></Route>
                    <Route exact path='/faq' component={Faq}></Route>
                </Switch>
            </Container>
        <DisburseFooter />
    </div>
  );
}

export default Main;