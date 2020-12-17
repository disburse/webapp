import React, { Component } from 'react';
import { Grid, Input, Button, Label } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import getWeb3 from '../getWeb3';
const Disburse = require('../contracts/DisburseV1.json');

class Recovery extends Component {

    state = {
        contractAddress: '',
        address: '',
        balance: '',
        amount: '',
        message: '',
        errorMessage: 'default error',
        loading: false
    }

    constructor(props) {
        super(props);
        console.log("CONSTRUCTOR CALLED");
    }

    onClickDeposit = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            /* 
            const web3 = await getWeb3();
            var weiAmount = web3.utils.toWei('10', 'ether');
 
            const disburse = new web3.eth.Contract(Disburse.abi, this.state.contractAddress);

            await disburse.methods.contributeToTrust().send({ from: this.state.address, value: weiAmount });
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

    onClickLoad = async (event) => {
        console.log("ON CLICK LOAD");
        
    };

    componentDidMount = async () => {
        console.log("RECOVER.JS COMPONENT DID MOUNT");

        const web3 = await getWeb3();

        const accounts = await web3.eth.getAccounts();
        this.setState({ address: accounts[0] });
        console.log("ACCOUNT: " + this.state.address);

        const networkId = await web3.eth.net.getId();
        console.log("NETWORK ID: " + networkId);
  
        const contract = Disburse.networks[networkId];
        this.setState({contractAddress: contract.address});
        console.log("CONTRACT ADDRESS: " + this.state.contractAddress);

        const disburse = new web3.eth.Contract(Disburse.abi, this.state.contractAddress);
        var balance = await disburse.methods.getTrustBalance(this.state.address).call();
        console.log("BALANCE: " + balance);
        this.setState({ balance: balance });
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
                        <Input labelPosition='right' type='text' placeholder='Address'>
                            <Label>Address:</Label>
                            <input value={this.state.address} />
                            <Button onClick={this.onClickLoad} >Load</Button>
                        </Input>
                        <br /><br />
                        <Input labelPosition='right' type='text' placeholder='Amount'>
                            <Label>Amount:</Label>
                            <input value={this.state.amount} onChange={event => this.setState({amount: event.target.value})} />
                            <Label basic>ETH</Label>
                        </Input>
                        <br /><br />
                        <Label size='large'>Available Funds: {this.state.balance} ETH</Label>
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
