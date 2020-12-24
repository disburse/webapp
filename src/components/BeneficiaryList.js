import React, { Component } from 'react';
import { Header, Table, Label, Message, Divider } from 'semantic-ui-react';
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

    constructor(props) {
        super(props)

        // When the callback is received from the BeneficiaryRow component, it is binded
        // to the current instance of this component.  Otherwise, set state will not work.
        this.callbackErrorReceived = this.callbackErrorReceived.bind(this)
    }

    callbackUpdateTable = () => {        
        console.log("PARENT BENEFICIARY LIST CALLED (callbackUpdateTable)");

        // Row removed, re-rendering table of beneficiaries
        this.componentDidMount();

        // Call back parent component to update available funds (addBeneficiary)
        this.props.parentForceUpdate();
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
        const networkId = await web3.eth.net.getId();  
        const contract = DisburseJSON.networks[networkId];
        this.setState({contractAddress: contract.address});

        const disburse = new web3.eth.Contract(DisburseJSON.abi, this.state.contractAddress);
        var topId = await disburse.methods.getTopBeneficiaryId().call({from: this.props.trustAddress});

        var list = [];
        for (var id=1; id<=topId; id++){
            var beneficiary = await disburse.methods.getBeneficiary(id).call({from: this.props.trustAddress});
            var complete = beneficiary['complete'];
            //console.log('BENEFICIARY COMPLETE (id): ' + id + ' ' + complete);

            if ((complete === false) && 
               (beneficiary.beneficiaryAddress !== '0x0000000000000000000000000000000000000000')) {
                list.push(beneficiary);
            }
        }

        this.setState({errorMessage: ''});
        this.setState({beneficiaryList: list});

        // Update allocated funds balance
        this.updateAllocatedFundsBalance();
    }
    
    renderRows() {
        // Map is a function available on arrays
        // Item represents every element in the array, which in this scenario is a Struct
        return this.state.beneficiaryList.map((item, index) => {
            return( 
                <BeneficiaryRow
                        ref = "cBeneficiaryRow"
                        key = {index}
                        beneficiary = {item}
                        contractAddress = {this.state.contractAddress}
                        parentCallback = {this.callbackUpdateTable}
                        errorCallback = {this.callbackErrorReceived}
                />
            );
        })
    }

    callbackErrorReceived(err) {
        console.log('ERROR RECEIVED: ' + err);
        this.setState({errorMessage: err});
    }

    displayError() {     
        if (this.state.errorMessage.length > 0) {
            return (<Message error header="Oops!" content={this.state.errorMessage} />);
        }
    }

    render() {
        return (
            <div>
                <Divider horizontal>
                    <Header size='medium'>Step 3: Review Disbursements</Header>
                </Divider>
                <Header sub>The table below lists all beneficiaries that will receive funds after their disbursement date.  Once the disbursement date has passed, the beneficiary cannot be removed.</Header>
                {this.displayError()}
                <br />
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Amount (ETH)</Table.HeaderCell>
                            <Table.HeaderCell>Disbursement</Table.HeaderCell>
                            <Table.HeaderCell>Remove</Table.HeaderCell>
                            <Table.HeaderCell>Disburse</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>
                <Label size='large' color='teal'>Allocated Funds to Beneficiaries: {this.state.allocatedFunds} ETH</Label>
                <br />
            </div>
        );
    }
}

export default BeneficiaryList;
