import React, { Component } from 'react';
import { Grid, Header, Container, Divider, Message } from 'semantic-ui-react';
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
import network from '../network';

class Disburse extends Component {

    state = {
        networkId: '',
        web3: null,
        disburse: null,
        contractAddress: '',
        trustAddress: '',
        errorMessage: ''
    } 

    // The constructor for a React component is called before it is mounted. When implementing 
    // the constructor for a React.Component subclass, you should call super(props) before any 
    // other statement. Otherwise, this.props will be undefined in the constructor, which can 
    // lead to bugs.
    constructor(props){
        super(props);

        this.checkNetwork();
        this.accountChanged();
    }

    componentDidMount = async () => {        
        var web3 = network.getWeb3();
        var disburse = network.getDisburse();

        console.log('DISBURSE: componentDidMount');

        this.setState({web3});
        this.setState({disburse});

        this.loadAllComponents();
    }

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
        this.refs.cBalance.componentDidMount();
        this.refs.cAddBeneficiary.componentDidMount();
    }

    callbackUpdateBeneficiaryList = () => {        
        console.log("PARENT FORCE UPDATE CALLED (UpdateBeneficiaryList)");
        this.refs.cBeneficiaryList.componentDidMount();
    }

    callbackLoadWallet = async () => {        
     
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
        const networkId = await network.getNetwork();
        const disburse = network.getDisburse();

        this.setState({web3});
        this.setState({disburse});
        this.setState({networkId});

        this.checkNetwork();
        this.loadAllComponents();

        // Test Polling
        // this.pollingConnection();
    }

    accountChanged = () => {
        // Will be triggered ever time an account is changed in MetaMask
        window.ethereum.on('accountsChanged', async (accounts) => {
            this.setState({trustAddress: accounts[0]}); 
            this.callbackLoadWallet();
        })
    }

    pollingConnection = () => {
        setInterval(async () => {
            const newBlock = await network.getBlockNumber();
            console.log('BLOCK: ' + newBlock);
        }, 1000);
    }

    checkNetwork = () => {

        if (this.state.networkId === 5){
            this.setState({errorMessage: ''});
        }
        else {
            this.setState({errorMessage: 'Please change to Goerli network.'});
        }
    }

    loadAllComponents = () => {    
        
        if (this.state.web3 != null && this.state.disburse != null) {
            this.refs.cBalance.componentDidMount();
            this.refs.cFundAccount.componentDidMount();
            this.refs.cAddBeneficiary.componentDidMount();
            this.refs.cBeneficiaryList.componentDidMount();
            this.refs.cDisbursementList.componentDidMount();
        }
    }

    displayError() {
        if (this.state.errorMessage.length > 0) {
            return (<Message error header="Oops!" content={this.state.errorMessage} />);
        }
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
                    {this.displayError()}
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