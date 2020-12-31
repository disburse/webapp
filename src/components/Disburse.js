import React, { Component } from 'react';
import { Grid, Header, Container, Divider } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import FundAccount from './FundAccount';
import AddBeneficiary from './AddBeneficiary';
import BeneficiaryList from './BeneficiaryList';
import DisbursementList from './DisbursementList';
import DisburseHeader from './Header';
import DisburseFooter from './Footer';

class Disburse extends Component {

    state = {
        web3: null,
        contractAddress: '',
        trustAddress: '',
    } 

    // The constructor for a React component is called before it is mounted. When implementing 
    // the constructor for a React.Component subclass, you should call super(props) before any 
    // other statement. Otherwise, this.props will be undefined in the constructor, which can 
    // lead to bugs.
    //constructor(props){
    //    super(props);
    //}

    //componentDidMount = async () => {}

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

    callbackLoadWallet = async () => {        
        console.log('CLICK LOAD WALLET');
    }

    render() {
        return (
        <div>
            <DisburseHeader loadWallet = {this.callbackLoadWallet}/>
            <Container style={{ marginTop: '4em' }}>
            <Grid textAlign='left' columns={1}>
                <Grid.Column>  
                    <Divider horizontal>
                    Testing In-Progress: Goerli Testnet Network
                    </Divider>
                </Grid.Column>
            </Grid>
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