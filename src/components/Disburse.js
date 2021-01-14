import React, { Component } from 'react';
import { Grid, Header, Container, Divider } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Balance from './Balance';
import FundAccount from './FundAccount';
import AddBeneficiary from './AddBeneficiary';
import BeneficiaryList from './BeneficiaryList';
import DisbursementList from './DisbursementList';
import DisburseHeader from './Header';
import DisburseFooter from './Footer';
import Web3 from "web3";
import Web3Modal from "web3modal";
import utility from '../utility';

class Disburse extends Component {

    state = {
        web3: null,
        disburse: null,
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

    componentDidMount = async () => {        
        var web3 = utility.getContextWeb3();
        var disburse = utility.getContextDisburse();

        console.log('Context Web3: ' + utility.getContextWeb3());
        console.log('Context Disburse: ' + utility.getContextDisburse());

        if (web3 !== 'undefined' && disburse !== 'undefined') {
            this.setState({web3: web3});
            this.setState({disburse: disburse});
            this.loadAllComponents(web3, disburse);
        }
    }

    callbackTrustAddress = (address) => {
        this.setState({trustAddress: address})
    }

    callbackUpdateAllComponents = () => {        
        console.log("PARENT FORCE UPDATE CALLED (UpdateAddBeneficiary)");
                
        this.refs.cFundAccount.componentDidMount(this.state.web3, this.state.disburse);
        this.refs.cAddBeneficiary.componentDidMount(this.state.web3, this.state.disburse);
        this.refs.cDisbursementList.componentDidMount(this.state.web3, this.state.disburse);
    }

    callbackUpdateAddBeneficiary = () => {        
        console.log("PARENT FORCE UPDATE CALLED (UpdateAddBeneficiary)");        
        this.refs.cBalance.componentDidMount(this.state.web3, this.state.disburse);
        this.refs.cAddBeneficiary.componentDidMount(this.state.web3, this.state.disburse);
    }

    callbackUpdateBeneficiaryList = () => {        
        console.log("PARENT FORCE UPDATE CALLED (UpdateBeneficiaryList)");
        this.refs.cBeneficiaryList.componentDidMount(this.state.web3, this.state.disburse);
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

        const networkId = await web3.eth.net.getId();
        console.log('NETWORK ID: ' + networkId);
        var disburse = utility.getDisburse(web3, networkId);
        this.setState({disburse: disburse});

        this.loadAllComponents(web3, disburse);
    }

    loadAllComponents = (web3, disburse) => {        
        this.refs.cBalance.componentDidMount(web3, disburse);
        this.refs.cFundAccount.componentDidMount(web3, disburse);
        this.refs.cAddBeneficiary.componentDidMount(web3, disburse);
        this.refs.cBeneficiaryList.componentDidMount(web3, disburse);
        this.refs.cDisbursementList.componentDidMount(web3, disburse);
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
            <Grid textAlign='center' columns={1}>
                <Grid.Column>  
                    <Balance ref = "cBalance" />
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
                            parentLoadWallet = {this.callbackLoadWallet}
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