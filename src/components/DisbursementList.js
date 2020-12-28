import React, { Component } from 'react';
import { Header, Table, Message} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import web3 from '../web3';
import DisbursementRow from './DisbursementRow';

const DisburseJSON = require('../contracts/DisburseV1.json');

class DisbursementList extends Component {

    state = {
        disbursementList: [],
        errorMessage: ''
    } 

    constructor(props) {
        super(props)

        // When the callback is received from the BeneficiaryRow component, it is binded
        // to the current instance of this component.  Otherwise, set state will not work.
        this.callbackErrorReceived = this.callbackErrorReceived.bind(this)
    }

    callbackUpdateTable = () => {        
        console.log("PARENT DISBURSEMENT LIST CALLED (callbackUpdateTable)");

        // Row removed, re-rendering table of beneficiaries
        this.componentDidMount();

        // Call back parent component to update available funds (addBeneficiary)
        this.props.parentForceUpdate();
    }

    componentDidMount = async () => {

        const networkId = await web3.eth.net.getId();  
        const contract = DisburseJSON.networks[networkId];
        this.setState({contractAddress: contract.address});

        const disburse = new web3.eth.Contract(DisburseJSON.abi, this.state.contractAddress);

        var beneficiaryAddress = this.props.trustAddress;
        var topId = await disburse.methods.topDisbursementId(beneficiaryAddress).call();

        var list = [];
        for (var id=1; id<=topId; id++){

            // Iterate through disburements and record the distribution ID
            var disbursement = await disburse.methods.disbursements(this.props.trustAddress, id).call({from: this.props.trustAddress});
            
            var beneficiaryId = disbursement['beneficiaryId'];
            var trustAddress = disbursement['trustAddress']
            
            var beneficiary = await disburse.methods.getBeneficiary(beneficiaryId).call({from: trustAddress});
            var complete = beneficiary['complete'];

            if ((complete === false) && 
                (beneficiary.beneficiaryAddress !== '0x0000000000000000000000000000000000000000')) {
             list.push(beneficiary);
         }
        }
 
        this.setState({disbursementList: list});
    }
    
    renderRows() {
        // Map is a function available on arrays
        // Item represents every element in the array, which in this scenario is a Struct
        return this.state.disbursementList.map((item, index) => {

            return( 
                <DisbursementRow
                        ref = "cDisbursementRow"
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
                <Header sub>Below is a list of all incoming disbursements.  Click the Receive Button to process them and receive the funds back into your account/wallet.</Header>
                {this.displayError()}
                <br />
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Sent From</Table.HeaderCell>
                            <Table.HeaderCell>Amount (ETH)</Table.HeaderCell>
                            <Table.HeaderCell>Disbursement Date</Table.HeaderCell>
                            <Table.HeaderCell>Receive (ETH)</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default DisbursementList;
