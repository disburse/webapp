import React, { Component } from 'react';
import { Button, Header, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class FutureBuy extends Component {

    state = {
        errorMessage: '',
        loading: false
    } 

    onClickBuy = async (event) => {}

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
                <Header sub>Buy Future</Header>
                <br />
                {this.displayError()}
                <Button loading={this.state.loading} primary onClick={this.onClickBuy}>Buy</Button>
            </div>
        );
    }
}

export default FutureBuy;
