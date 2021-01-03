import React, { Component } from 'react';
import { Grid, Header, Container, Divider } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import FundAccount from './FundAccount';
import AddBeneficiary from './AddBeneficiary';
import BeneficiaryList from './BeneficiaryList';
import DisbursementList from './DisbursementList';
import DisburseHeader from './Header';
import DisburseFooter from './Footer';
import Web3 from "web3";
import Web3Modal from "web3modal";

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
        
        this.refs.cFundAccount.componentDidMount(this.state.web3);
        this.refs.cAddBeneficiary.componentDidMount(this.state.web3);
        this.refs.cDisbursementList.componentDidMount(this.state.web3);
    }

    callbackUpdateAddBeneficiary = () => {        
        console.log("PARENT FORCE UPDATE CALLED (UpdateAddBeneficiary)");        
        this.refs.cAddBeneficiary.componentDidMount(this.state.web3);
    }

    callbackUpdateBeneficiaryList = () => {        
        console.log("PARENT FORCE UPDATE CALLED (UpdateBeneficiaryList)");
        this.refs.cBeneficiaryList.componentDidMount(this.state.web3);
    }

    callbackLoadWallet = async () => {        
        console.log('CLICK LOAD WALLET');
      
        const providerOptions = {
          /* See Provider Options Section */
        };
        
        const web3Modal = new Web3Modal({
          //network: "mainnet", // optional
          //cacheProvider: true, // optional
          providerOptions // required
        });
        
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        this.setState({web3: web3});

        this.refs.cFundAccount.componentDidMount(this.state.web3);
        this.refs.cAddBeneficiary.componentDidMount(this.state.web3);
        this.refs.cBeneficiaryList.componentDidMount(this.state.web3);
        this.refs.cDisbursementList.componentDidMount(this.state.web3);
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


// web3 can be saved in the state

// if (typeof web3 === 'undefined'){}

// Within render()
// if (!this.state.web3){
//  return <div>Loading web3</div> 
// }