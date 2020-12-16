import React, { Component } from 'react';
import { Grid, Input, Button, Label } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class Disburse extends Component {

    state = {
        message: '',
        errorMessage: 'default error',
        loading: false
    }

    // Convert a wei balance to ether for display purposes
    // web3.utils.fromWei(balance, 'ether')

    //constructor(props){
    //    super(props);
    //}

    //static async getInitialProps(props) {
        // URL Address
        //props.query.address;
    //}

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
                        <Header size='medium'>Disbributrion Fund</Header>
                        <Input label='Owner Address:' placeholder='0x...' />
                        <br /><br />
                        <Input labelPosition='right' type='text' placeholder='Amount'>
                            <Label>Disbursement Amount:</Label>
                            <input />
                            <Label basic>ETH</Label>
                        </Input>
                        <br /><br />
                        <Label size='large'>Total Fund: 10.00 ETH</Label>
                        <br /><br />
                        <Button loading={this.state.loading} primary onClick={this.onClick}>Fund</Button>
                        <Divider />
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column></Grid.Column>
                    <Grid.Column>
                        <Header size='medium'>Add Beneficiaries</Header>
                        <Input label='Beneficiary Address:' placeholder='0x...' />
                        <br /><br />
                        <Input label='Disbursement Date:' />
                        <br /><br />
                        <Input labelPosition='right' type='text' placeholder='Amount'>
                            <Label>Disbursement Amount:</Label>
                            <input />
                            <Label basic>ETH</Label>
                        </Input>
                        <br /><br />
                        <Button loading={this.state.loading} primary onClick={this.onClick}>Add Beneficiary</Button>
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
