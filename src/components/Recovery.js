import React, { Component } from 'react';
import { Grid, Input, Button, Label } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import getWeb3 from '../getWeb3';

class Recovery extends Component {

    state = {
        accounts: '',
        message: '',
        errorMessage: 'default error',
        loading: false
    }

    // Event handler with async to be able to call ethereum
    onClick = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            // perform some work
            this.setState({ message: "Button clicked!" });
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});
    };

    componentDidMount = async () => {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        this.setState({ accounts: accounts });
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
                        <Input label='Address:' placeholder={this.state.accounts[0]} />
                        <br /><br />
                        <Input labelPosition='right' type='text' placeholder='Amount'>
                            <Label>Amount:</Label>
                            <input />
                            <Label basic>ETH</Label>
                        </Input>
                        <br /><br />
                        <Label size='large'>Available Funds: 10.00 ETH</Label>
                        <br /><br />
                        <Button loading={this.state.loading} primary onClick={this.onClick}>Deposit</Button>
                        <Button loading={this.state.loading} primary onClick={this.onClick}>Withdraw</Button>
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
