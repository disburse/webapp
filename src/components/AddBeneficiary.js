import React, { Component } from 'react';
import { Input, Button, Label, Header, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import web3 from '../web3';

const DisburseJSON = require('../contracts/DisburseV1.json');

class AddBeneficiary extends Component {

    state = {
        contractAddress: '',
        beneficiaryAddress: '',
        amount: '',
        delayInSeconds: '',
        availableFunds: '',
        errorMessage: '',
        loading: false
    } 

    updateAvailableFundsBalance = async () => {

        if (this.props.trustAddress != null){

            // Update allocated funds balance
            const disburse = new web3.eth.Contract(DisburseJSON.abi, this.state.contractAddress);
            var trustBalance = await disburse.methods.getTrustBalance(this.props.trustAddress).call();        
            var allocatedBalance = await disburse.methods.getBeneficiaryBalance(this.props.trustAddress).call();
        
            var weiBalance = 0;
            if (trustBalance >= 0 && allocatedBalance >= 0){
                weiBalance = trustBalance - allocatedBalance;
            }
        
            var etherBalance = web3.utils.fromWei(weiBalance.toString(), 'ether');
            this.setState({ availableFunds: etherBalance });

            // When this balance updates, we need to update the balance on other components
            this.props.parentForceUpdate();
        }
    }

    componentDidMount = async () => {
        const networkId = await web3.eth.net.getId();  
        const contract = DisburseJSON.networks[networkId];
        this.setState({contractAddress: contract.address});
        this.updateAvailableFundsBalance();
    }

    onClickAdd = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            console.log("START ADD BENEFICIARY");

            const disburse = new web3.eth.Contract(DisburseJSON.abi, this.state.contractAddress);
            var weiAmount = web3.utils.toWei(this.state.amount, 'ether');    
            console.log("ADD: "+this.state.beneficiaryAddress);
            console.log("DELAY: "+this.state.delayInSeconds);
            console.log("AMT: "+weiAmount);       
            await disburse.methods.addBeneficiarySeconds(
                                    this.state.beneficiaryAddress, 
                                    this.state.delayInSeconds, 
                                    weiAmount)
                                .send({from: this.props.trustAddress});

            this.updateAvailableFundsBalance();

            // Clear fields
            this.setState({beneficiaryAddress: ''});
            this.setState({amount: ''});
            this.setState({delayInSeconds: ''});
            this.setState({ errorMessage: '' });
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});

        this.forceUpdate();
    }

    displayError() {       
        if (this.state.errorMessage.length > 0) {
            return (<Message error header="Oops!" content={this.state.errorMessage} />);
        }
    }
    
    render() {
        return (
            <div>
                <Header size='medium'>Add Beneficiary</Header>
                <Header sub>Use the form below to add beneficiaries that will receive funds after the disbursement date.  Beneficiaries can only be added by the owner of the funding account.</Header>
                <br />
                <Input label='Funding Address:' value={this.props.trustAddress} />
                <br /><br />
                <Input label='Receiving Address:' placeholder='0x...' onChange = {event => this.setState({beneficiaryAddress: event.target.value})} />
                <br /><br />
                <Input labelPosition='right' type='text' placeholder='Amount'>
                    <Label>Amount:</Label>
                    <input value={this.state.amount} onChange={event => this.setState({amount: event.target.value})} />
                    <Label basic>ETH</Label>
                </Input>
                <br /><br />
                <Input label='Disbursement Date:' placeholder='01/30/2020' onChange={event => this.setState({delayInSeconds: event.target.value})} />
                <br /><br />
                <Label size='large'>Available Funds: {this.state.availableFunds} ETH</Label>
                <br /><br />
                {this.displayError()}
                <Button loading={this.state.loading} primary onClick={this.onClickAdd}>Add</Button>
            </div>
        );
    }
}

export default AddBeneficiary;
