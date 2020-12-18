import React, { Component } from 'react';
import { Grid, Input, Button, Label, Header, Table, Container, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import web3 from '../web3';
import BeneficiaryRow from './BeneficiaryRow';
import Faq from './Faq';
import DisburseHeader from './Header';
import DisburseFooter from './Footer';
const DisburseJSON = require('../contracts/DisburseV1.json');

// Header & Footer
//https://react.semantic-ui.com/layouts/fixed-menu
//https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/FixedMenuLayout.js

class Disburse extends Component {

    state = {
        trustAddress: '',
        disburseAddress: '',
        balance: '',
        amount: '',
        message: '',
        errorMessage: '',
        loading: false
    } 

    constructor(props){
        super(props);
        console.log("CONSTRUCTOR CALLED");
    }

    //static async getInitialProps(props) {
        // URL Address
        //props.query.address;
    //}

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

    }

    displayError() {        
        if (this.state.errorMessage.length > 0) {
            return (<Message error header="Oops!" content={this.state.errorMessage} />);
        }
    }

    renderRows() {
        return(
            <BeneficiaryRow  
                address = '1'
                amount = '2'
                disbursement = '3'
            />
        );

        /*
        return this.props.beneficiaries.map((request, index) => {
            return( 
                <BeneficiaryRow
                        // This syntax is how you pass data to components
                        key={index}    
                        id={index}
                        request={request}
                        address={this.props.address}
                />
            );
        })
        */
        
    }

    componentDidMount = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({ trustAddress: accounts[0] });

        const networkId = await web3.eth.net.getId();  
        const contract = DisburseJSON.networks[networkId];
        this.setState({contractAddress: contract.address});

        const disburse = new web3.eth.Contract(DisburseJSON.abi, this.state.contractAddress);
        var weiBalance = await disburse.methods.getTrustBalance(this.state.trustAddress).call();        
        var etherBalance = web3.utils.fromWei(weiBalance, 'ether');
        this.setState({ balance: etherBalance });
    }
    
    render() {
        return (
        <div>
            <DisburseHeader />
            
            <Container style={{ marginTop: '4em' }}>
                <Grid textAlign='left' columns={3}>
                    <Grid.Row>
                        <Grid.Column />
                        <Grid.Column>
                            <Header size='medium'>Fund Account</Header>
                            <Header sub>Use the form below to deposit or withdraw funds available for future disbursement.</Header>
                            <br />
                            <Input label='Address:' placeholder={this.state.trustAddress} />
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
                        </Grid.Column>
                        <Grid.Column />
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column />
                        <Grid.Column>
                            <Header size='medium'>Add Beneficiary</Header>
                            <Header sub>Use the form below to add beneficiaries that will receive funds after the disbursement date.  Beneficiaries can only be added by the owner of the funding account.</Header>
                            <br />
                            <Input label='Address:' placeholder='0x...' />
                            <br /><br />
                            <Input labelPosition='right' type='text' placeholder='Amount'>
                                <Label>Amount:</Label>
                                <input />
                                <Label basic>ETH</Label>
                            </Input>
                            <br /><br />
                            <Input label='Disbursement Date:' />
                            <br /><br />
                            <Button loading={this.state.loading} primary onClick={this.onClick}>Add Beneficiary</Button>
                        </Grid.Column>
                        <Grid.Column />
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column />
                        <Grid.Column>
                            <Header size='medium'>Beneficiaries</Header>
                            <Header sub>The table below lists all beneficiaries that will receive funds after their disbursement date.</Header>
                            <br />
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Address</Table.HeaderCell>
                                        <Table.HeaderCell>Amount</Table.HeaderCell>
                                        <Table.HeaderCell>Disbursement</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.renderRows()}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                        <Grid.Column />
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column />
                        <Grid.Column>
                            <Header size='medium'>Frequently Asked Questions</Header>
                            <Faq />
                        </Grid.Column>
                        <Grid.Column />
                    </Grid.Row>
                </Grid>
            </Container>

            <DisburseFooter />
        </div>
        );
    }
}

export default Disburse;

// <Message header="" content={this.state.message}/>
// <Message error header="Oops!" content={this.state.errorMessage} />

// Retrieve the value of a state variable
//value = {this.state.variableName}

// Set the value of a state variable on a form element
//onChange = {event => this.setState({variableName: event.target.value})}