import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import DisburseHeader from './Header';
import DisburseFooter from './Footer';
import FundAccount from './FundAccount';
import AddBeneficiary from './AddBeneficiary';
import BeneficiaryList from './BeneficiaryList';
import DisbursementList from './DisbursementList';

class Disburse extends Component {

    state = {
        contractAddress: '',
        trustAddress: '',
    } 

    // constructor(props){
    //    super(props);
    // }

    // componentDidMount = async () => {}

    callbackTrustAddress = (address) => {
        this.setState({trustAddress: address})
    }

    callbackUpdateAddBeneficiary = () => {        
        console.log("PARENT FORCE UPDATE CALLED (UpdateAddBeneficiary)");
        
        //this.refs.cAddBeneficiary.updateAvailableFundsBalance();
        this.refs.cAddBeneficiary.componentDidMount();
    }

    callbackUpdateBeneficiaryList = () => {        
        console.log("PARENT FORCE UPDATE CALLED (UpdateBeneficiaryList)");
        
        //this.refs.cBeneficiaryList.updateAllocatedFundsBalance();
        this.refs.cBeneficiaryList.componentDidMount();
    }

    render() {
        return (
        <div>
            <DisburseHeader />
            <Container style={{ marginTop: '4em' }}>
                <Grid textAlign='left' columns={1}>
                    <Grid.Row>
                        <Grid.Column>
                            <FundAccount
                                ref = "cFundAccount"
                                parentForceUpdate = {this.callbackUpdateAddBeneficiary}  
                                parentCallback = {this.callbackTrustAddress} /> 
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <AddBeneficiary 
                                ref = "cAddBeneficiary"
                                parentForceUpdate = {this.callbackUpdateBeneficiaryList} 
                                trustAddress = {this.state.trustAddress} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <BeneficiaryList 
                                ref = "cBeneficiaryList"
                                parentForceUpdate = {this.callbackUpdateAddBeneficiary} 
                                trustAddress = {this.state.trustAddress} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <DisbursementList 
                                ref = "cDisbursementList"
                                parentForceUpdate = {this.callbackUpdateAddBeneficiary} 
                                trustAddress = {this.state.trustAddress} />
                        </Grid.Column>
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