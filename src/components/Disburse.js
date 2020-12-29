import React, { Component } from 'react';
import { Grid, Header, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import FundAccount from './FundAccount';
import AddBeneficiary from './AddBeneficiary';
import BeneficiaryList from './BeneficiaryList';
import DisbursementList from './DisbursementList';
import DisburseHeader from './Header';
import DisburseFooter from './Footer';

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

    callbackUpdateAllComponents = () => {        
        console.log("PARENT FORCE UPDATE CALLED (UpdateAddBeneficiary)");
        
        this.refs.cFundAccount.componentDidMount();
        this.refs.cAddBeneficiary.componentDidMount();
        this.refs.cDisbursementList.componentDidMount();
    }

    callbackUpdateAddBeneficiary = () => {        
        console.log("PARENT FORCE UPDATE CALLED (UpdateAddBeneficiary)");        
        this.refs.cAddBeneficiary.componentDidMount();
    }

    callbackUpdateBeneficiaryList = () => {        
        console.log("PARENT FORCE UPDATE CALLED (UpdateBeneficiaryList)");
        this.refs.cBeneficiaryList.componentDidMount();
    }

    render() {
        return (
        <div>
            <DisburseHeader />
            <Container style={{ marginTop: '4em' }}>
            <br />
            <br />
            <Grid textAlign='left' columns={1}>
                <Grid.Column>  
                    <Header size='medium'>Setup Future Dated Payment</Header>
                </Grid.Column>
            </Grid>
            <Grid textAlign='left' columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <FundAccount
                            ref = "cFundAccount"
                            parentForceUpdate = {this.callbackUpdateAddBeneficiary}  
                            parentCallback = {this.callbackTrustAddress} /> 
                    </Grid.Column>
                    <Grid.Column>
                        <AddBeneficiary 
                            ref = "cAddBeneficiary"
                            parentForceUpdate = {this.callbackUpdateBeneficiaryList} 
                            trustAddress = {this.state.trustAddress} />                            
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <br />
            <br />
            <br />
            <Grid textAlign='left' columns={1}>
                <Grid.Row>
                    <Grid.Column>
                        <BeneficiaryList 
                            ref = "cBeneficiaryList"
                            parentForceUpdate = {this.callbackUpdateAllComponents} 
                            trustAddress = {this.state.trustAddress} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <br />
            <br />
            <br />
            <Grid textAlign='left' columns={1}>
                <Grid.Row> 
                    <Grid.Column>
                        <Header size='medium'>Accept Incoming Payment</Header>
                        <br />
                        <DisbursementList 
                            ref = "cDisbursementList"
                            parentForceUpdate = {this.callbackUpdateAllComponents} 
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