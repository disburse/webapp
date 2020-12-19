import React, { Component } from 'react';
import {Input, Button, Label, Header, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import web3 from '../web3';

const DisburseJSON = require('../contracts/DisburseV1.json');

class FundAccount extends Component {

    state = {
        contractAddress: '',
        trustAddress: '',
        amount: '',
        balance: '',
        errorMessage: '',
        loading: false
    } 

    componentDidMount = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({ trustAddress: accounts[0] });

        // Pass the trust address back to the parent component
        this.props.parentCallback(this.state.trustAddress);

        const networkId = await web3.eth.net.getId();  
        const contract = DisburseJSON.networks[networkId];
        this.setState({contractAddress: contract.address});

        const disburse = new web3.eth.Contract(DisburseJSON.abi, this.state.contractAddress);
        var weiBalance = await disburse.methods.getTrustBalance(this.state.trustAddress).call();        
        var etherBalance = web3.utils.fromWei(weiBalance, 'ether');
        this.setState({ balance: etherBalance });
    }

    // Event handler with async to be able to call ethereum
    onClickDeposit = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            console.log("START DEPOSIT");
            var weiAmount = web3.utils.toWei(this.state.amount, 'ether');
            const disburse = new web3.eth.Contract(DisburseJSON.abi, this.state.contractAddress);
            await disburse.methods.contributeToTrust().send({ from: this.state.trustAddress, value: weiAmount });
            var weiBalance = await disburse.methods.getTrustBalance(this.state.trustAddress).call();
            var etherBalance = web3.utils.fromWei(weiBalance, 'ether');
            this.setState({ balance: etherBalance });
            this.setState({ amount: '' });
            this.setState({ errorMessage: '' });
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});

        // Render again to remove error message
        this.forceUpdate();  
    };

    onClickWithdraw = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            console.log("START WITHRAW");
            const disburse = new web3.eth.Contract(DisburseJSON.abi, this.state.contractAddress);
            await disburse.methods.withdrawTrustBalance().send({from: this.state.trustAddress});
            var weiBalance = await disburse.methods.getTrustBalance(this.state.trustAddress).call();
            var etherBalance = web3.utils.fromWei(weiBalance, 'ether');
            this.setState({ balance: etherBalance });
            this.setState({ amount: '' });
            this.setState({ errorMessage: '' });
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});

        // Render again to remove error message
        this.forceUpdate();  
    }

    displayError() {       
        if (this.state.errorMessage.length > 0) {
            return (<Message error header="Oops!" content={this.state.errorMessage} />);
        }
    }

    render() {
        return (
            <div>
                <Header size='medium'>Fund Account</Header>
                <Header sub>Use the form below to deposit or withdraw funds available for future disbursement.</Header>
                <br />
                <Input label='Funding Address:' value={this.state.trustAddress} />
                <br /><br />
                <Input labelPosition='right' type='text' placeholder='Amount'>
                    <Label>Amount:</Label>
                    <input value={this.state.amount} onChange={event => this.setState({amount: event.target.value})} />
                    <Label basic>ETH</Label>
                </Input>
                <br /><br />
                <Label size='large'>Deposited Funds: {this.state.balance} ETH</Label>
                <br /><br />
                {this.displayError()}
                <Button loading={this.state.loading} primary onClick={this.onClickDeposit}>Deposit</Button>
                <Button loading={this.state.loading} primary onClick={this.onClickWithdraw}>Withdraw</Button>
            </div>
        );
    }
}

export default FundAccount;