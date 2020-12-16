import React, { Component } from 'react';
import { Grid, Input, Button, Label } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import getWeb3 from '../getWeb3';
const Disburse = require('../contracts/DisburseV1.json');

class Recovery extends Component {

    //static web3;

    state = {
        trustAddress: '',
        trustBalance: '',
        amount: '',
        message: '',
        errorMessage: 'default error',
        loading: false
    }

    onClickDeposit = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            /* 
            const web3 = await getWeb3();
            var weiAmount = web3.utils.toWei('10', 'ether');
 
            const id = await web3.eth.net.getId();
            const deployedNetwork = Disburse.networks[id];
            const disburse = new web3.eth.Contract(Disburse.abi, deployedNetwork.address);

            await disburse.methods.contributeToTrust().send({ from: this.state.trustAddress, value: weiAmount });
            var balance = await disburse.methods.getTrustBalance(this.state.trustAddress).call();
            this.setState({ trustBalance: balance });
            */
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});
    };

    onClickWithdraw = async (event) => {

    };

    componentDidMount = async () => {
        console.log("COMPONENT DID MOUNT");
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        this.setState({ trustAddress: accounts[0] });
        console.log("TRUST ACCOUNT: " + this.state.trustAddress);

        const id = await web3.eth.net.getId();
        console.log("NETWORK ID: " + id);

        const deployedNetwork = Disburse.networks[id];
        console.log("DEPLOYED NETWORK: " + deployedNetwork.address);

        const disburse = new web3.eth.Contract(Disburse.abi, deployedNetwork.address);
        var balance = await disburse.methods.getTrustBalance(this.state.trustAddress).call();
        console.log("TRUST BALANCE: " + balance);
        this.setState({ trustBalance: balance });
    }

    render() {
        return (
        <div>

            <Grid textAlign='left' columns={3}>
                <Grid.Row>
                    <Grid.Column></Grid.Column>
                    <Grid.Column></Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
                
                <Grid.Row>
                    <Grid.Column></Grid.Column>
                    <Grid.Column>
                        <Divider />
                        <Header size='medium'>Account Details</Header>
                        <Header sub>Use the form below to deposit or withdraw your funds.</Header>
                        <br />
                        <Input label='Address:' placeholder={this.state.trustAddress} />
                        <br /><br />
                        <Input labelPosition='right' type='text' placeholder='Amount'>
                            <Label>Amount:</Label>
                            <input />
                            <Label basic>ETH</Label>
                        </Input>
                        <br /><br />
                        <Label size='large'>Available Funds: {this.state.trustBalance} ETH</Label>
                        <br /><br />
                        <Button loading={this.state.loading} primary onClick={this.onClickDeposit}>Deposit</Button>
                        <Button loading={this.state.loading} primary onClick={this.onClickWithdraw}>Withdraw</Button>
                        <Divider />
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column></Grid.Column>
                    <Grid.Column>
                        <Header size='medium'>Backup Account</Header>
                        <Header sub>In the event you lose the private key to your account, you can specify a backup account to have all your funds withdrawn to.</Header>
                        <br />
                        <Input label='Address:' placeholder='0x...' />
                        <br /><br />                    
                        <Input label='Disbursement Date:' />
                        <br /><br />
                        <Button loading={this.state.loading} primary onClick={this.onClick}>Add Backup Account</Button>
                        <Divider />
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
        );
    }
}

export default Recovery;
