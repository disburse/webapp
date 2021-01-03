import React, { Component } from 'react';
import {Input, Button, Label, Header, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import validator from 'validator';
import Disburse from '../contracts';

class FundAccount extends Component {

    state = {
        web3: null,
        disburse: null,
        trustAddress: '',
        amount: '',
        depositedFunds: '',
        errorMessage: '',
        loading: false
    } 

    updateDepositedFundsBalance = async () => {

        if (this.state.trustAddress != null){
            
            var weiBalance = await this.state.disburse.methods.getTrustBalance(this.state.trustAddress).call();
            
            var etherBalance = 0;
            if (weiBalance > 0){
                etherBalance = this.state.web3.utils.fromWei(weiBalance.toString(), 'ether');
            }

            this.setState({ depositedFunds: etherBalance });    
            
            // When this balance updates, we need to update the balance on other components
            this.props.parentForceUpdate();
        }
    }

    validate = () => {

        var error = '';
        var errors = [];
        var valid = true;

        // Clear previous error messages
        this.setState({ errorMessage: '' });

        // FUNDING ADDRESS
        if ((validator.isEmpty(this.state.trustAddress)) ||
            (!validator.isEthereumAddress(this.state.trustAddress))){
            errors.push('Funding Address');
            valid = false;
        }

        // AMOUNT
        if ((validator.isEmpty(this.state.amount)) ||
            (!validator.isNumeric(this.state.amount))){
            errors.push('Amount');
            valid = false;
        }

        // Assemble error message
        if (!valid){
            error = 'Invalid: ';
            var errorList = '';
            errors.forEach(function (item) {
                errorList += item + ', '; 
            });
            error += errorList;
        }

        // Remove last comma in error list
        var index = error.lastIndexOf(',');
        error = error.substr(0, index);
        this.setState({ errorMessage: error });
        return valid;
    }

    // Event handler with async to be able to call ethereum
    onClickDeposit = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            if (this.validate()){

                var weiAmount = this.state.web3.utils.toWei(this.state.amount, 'ether');
                await this.state.disburse.methods.contributeToTrust().send({ from: this.state.trustAddress, value: weiAmount });
                this.updateDepositedFundsBalance();

                this.setState({ amount: '' });
                this.setState({ errorMessage: '' });
            }
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});
    };

    onClickWithdraw = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            if (this.validate()){

                var weiAmount = this.state.web3.utils.toWei(this.state.amount, 'ether');
                await this.state.disburse.methods.withdrawAmountFromTrustBalance(weiAmount).send({from: this.state.trustAddress});
                this.updateDepositedFundsBalance();

                this.setState({ amount: '' });
                this.setState({ errorMessage: '' });
            }
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});
    }

    onClickLoadWallet = async () => {
        this.props.parentLoadWallet();
        this.setState({amount: ''});
        this.setState({errorMessage: ''});
    }

    displayError() {       
        if (this.state.errorMessage.length > 0) {
            return (<Message error header="Oops!" content={this.state.errorMessage} />);
        }
    }

    componentDidMount = async (web3) => {

        console.log('WEB3 (FundAccount): ' + web3);

        if (web3 !== undefined){

            this.setState({web3: web3});
            this.setState({disburse: Disburse(web3)});
 
            const accounts = await web3.eth.getAccounts();
            this.setState({ trustAddress: accounts[0] });

            // Pass the trust address back to the parent component
            this.props.parentCallback(this.state.trustAddress);

            this.updateDepositedFundsBalance();

            console.log('Fund Account Loaded');
        }
    }

    render() {
        return (
            <div>
                <Header sub>1. Deposit or withdraw funds that will be available for use in future dated payments.</Header>
                <br />
                <Input labelPosition='right' type='text' placeholder='0x...'>
                    <Label>Funding Address:</Label>
                    <input value={this.state.trustAddress} />
                    <Button compact color='teal' onClick={this.onClickLoadWallet}>Load</Button>
                </Input>
                <br /><br />
                <Input labelPosition='right' type='text' placeholder='Amount'>
                    <Label>Amount:</Label>
                    <input value={this.state.amount} onChange={event => this.setState({amount: event.target.value})} />
                    <Label basic>ETH</Label>
                </Input>
                <br /><br />
                <Label size='large' color='teal'>Deposited Funds: {this.state.depositedFunds} ETH</Label>
                <br /><br />
                {this.displayError()}
                <Button loading={this.state.loading} primary onClick={this.onClickDeposit}>Deposit</Button>
                <Button loading={this.state.loading} primary onClick={this.onClickWithdraw}>Withdraw</Button>
            </div>
        );
    }
}

export default FundAccount;