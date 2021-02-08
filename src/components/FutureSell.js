import React, { Component } from 'react';
import { Button, Header, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class FutureSell extends Component {

    state = {
        errorMessage: '',
        loading: false
    } 

    onClickSell = async (event) => {}

    displayError() {       
        if (this.state.errorMessage.length > 0) {
            return (<Message error header="Oops!" content={this.state.errorMessage} />);
        }
    }

    componentDidMount = async () => {
 
    }

    render() {

        return (
            <div>
                <Header sub>Sell Future</Header>
                <br />
                {this.displayError()}
                <Button loading={this.state.loading} primary onClick={this.onClickSell}>Sell</Button>
            </div>
        );
    }
}

export default FutureSell;
