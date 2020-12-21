import React, { Component } from 'react';
import { Header, Table, Label, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import web3 from '../web3';
import BeneficiaryRow from './BeneficiaryRow';

const DisburseJSON = require('../contracts/DisburseV1.json');

class BeneficiaryList extends Component {

    state = {
        contractAddress: '',
        beneficiaryList: [],
        renderRows: '',
        allocatedFunds: '',
        errorMessage: '',
        loading: false
    } 

    callbackUpdateTable = () => {        
        console.log("PARENT BENEFICIARY LIST CALLED (callbackUpdateTable)");

        // Row removed, re-rendering table of beneficiaries
        this.componentDidMount();
    }

    callbackUpdateErrorMessage = () => {        
        console.log("PARENT BENEFICIARY LIST CALLED (callbackUpdateErrorMessage)");
    }

    updateAllocatedFundsBalance = async () => {

        if (this.props.trustAddress != null){

            // Update allocated funds balance
            const disburse = new web3.eth.Contract(DisburseJSON.abi, this.state.contractAddress);
            var weiBalance = await disburse.methods.getBeneficiaryBalance(this.props.trustAddress).call();

            var etherBalance = 0;
            if (weiBalance > 0){
                etherBalance = web3.utils.fromWei(weiBalance, 'ether');
            }
            
            this.setState({ allocatedFunds: etherBalance });
        }
    }
    componentDidMount = async () => {
        this.setState({forceUpdate: this.props.forceUpdate});

        const networkId = await web3.eth.net.getId();  
        const contract = DisburseJSON.networks[networkId];
        this.setState({contractAddress: contract.address});

        const disburse = new web3.eth.Contract(DisburseJSON.abi, this.state.contractAddress);
        var count = await disburse.methods.getBeneficiaryCount().call({from: this.props.trustAddress});

        var list = [];
        for (var i=0; i<count; i++){
            var beneficiary = await disburse.methods.getBeneficiaryAtIndex(i).call({from: this.props.trustAddress});
            list.push(beneficiary);
        }

        this.setState({beneficiaryList: list});

        // Update allocated funds balance
        this.updateAllocatedFundsBalance();
    }
    
    renderRows() {
        // Map is a function available on arrays
        // Item represents every element in the array, which in this scenario is a Struct
        return this.state.beneficiaryList.map((item, index) => {

            var ethAmount = web3.utils.fromWei(item['amount'], 'ether');
            var formattedDate = item['disburseDate'];

            return( 
                <BeneficiaryRow
                        ref = "cBeneficiaryRow"
                        key = {index}
                        id = {index}
                        address = {item['beneficiaryAddress']}
                        amount = {ethAmount}
                        disbursement = {formattedDate}
                        contractAddress = {this.state.contractAddress}
                        trustAddress = {this.props.trustAddress}
                        parentCallback = {this.callbackUpdateTable}
                        errorCallback = {this.callbackUpdateErrorMessage}
                />
            );
        })
    }

    displayError() {       
        if (this.state.errorMessage.length > 0) {
            return (<Message error header="Oops!" content={this.state.errorMessage} />);
        }
    }

    render() {
        return (
            <div>
                <Header size='medium'>Beneficiaries</Header>
                <Header sub>The table below lists all beneficiaries that will receive funds after their disbursement date.</Header>
                <br />
                {this.displayError()}
                <br />
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Amount (ETH)</Table.HeaderCell>
                            <Table.HeaderCell>Disbursement</Table.HeaderCell>
                            <Table.HeaderCell>Remove</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>
                <br />
                <Label size='large'>Allocated Funds: {this.state.allocatedFunds} ETH</Label>
            </div>
        );
    }
}

export default BeneficiaryList;
