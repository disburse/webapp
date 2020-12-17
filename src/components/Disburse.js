import React, { Component } from 'react';
import { Grid, Input, Button, Label, Header, Divider, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import getWeb3 from '../getWeb3';
//import BeneficiaryRow from './BeneficiaryRow';

class Disburse extends Component {

    state = {
        accounts: '',
        amount: '',
        message: '',
        errorMessage: 'default error',
        loading: false
    }

    //constructor(props){
    //    super(props);
    //}

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
            // perform some work
            this.setState({ message: "Button clicked!" });
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});
    };

    onClickWithdraw = async (event) => {
    }

    static async getInitialProps(props){
        console.log("GET INITIAL PROPS CALLED: " + props.query);
    }

    renderRows() {
        /*
        return this.props.request.map((request, index) => {
            return( 
                <BeneficiaryRow
                        key={index}    
                        request={request}
                        address={this.props.address}
                />
            );
        })
        */
    }

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
                    <Grid.Column>
                        <Divider />
                        <Header size='medium'>Fund Account</Header>
                        <Header sub>Use the form below to deposit or withdraw funds available for future disbursement.</Header>
                        <br />
                        <Input label='Address:' placeholder={this.state.accounts[0]} />
                        <br /><br />
                        <Input labelPosition='right' type='text' placeholder='Amount'>
                            <Label>Amount:</Label>
                            <input value={this.state.amount} onChange={event => this.setState({amount: event.target.value})} />
                            <Label basic>ETH</Label>
                        </Input>
                        <br /><br />
                        <Label size='large'>Deposited Funds: 10.00 ETH</Label>
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
                        <Divider />
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column></Grid.Column>
                    <Grid.Column>
                        <Header size='medium'>Beneficiaries</Header>
                        <Header sub>The table below lists all beneficiaries that will receive funds after their disbursement date.</Header>
                        <br />
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Beneficiary</Table.HeaderCell>
                                    <Table.HeaderCell>Amount</Table.HeaderCell>
                                    <Table.HeaderCell>Disbursement Date</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.renderRows()}
                                <Table.Row>
                                    <Table.Cell>Cell</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                        <Divider />
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
            </Grid>
        </div>

            // <Message header="" content={this.state.message}/>
            // <Message error header="Oops!" content={this.state.errorMessage} />

            // Retrieve the value of a state variable
            //value = {this.state.variableName}

            // Set the value of a state variable on a form element
            //onChange = {event => this.setState({variableName: event.target.value})}
        );
    }
}

export default Disburse;
