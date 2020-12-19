import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Faq from './Faq';
import DisburseHeader from './Header';
import DisburseFooter from './Footer';
import FundAccount from './FundAccount';
import AddBeneficiary from './AddBeneficiary';
import BeneficiaryList from './BeneficiaryList';

class Disburse extends Component {

    state = {
        contractAddress: '',
        trustAddress: ''
    } 

    // constructor(props){
    //    super(props);
    // }

    // componentDidMount = async () => {}

    callbackTrustAddress = (address) => {
        this.setState({trustAddress: address})
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
                            <FundAccount parentCallback = {this.callbackTrustAddress} /> 
                            <br />
                            <AddBeneficiary trustAddress={this.state.trustAddress} />
                            <br />
                            <BeneficiaryList trustAddress={this.state.trustAddress} />
                            <br />
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