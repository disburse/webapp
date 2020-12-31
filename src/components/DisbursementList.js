import React, { Component } from 'react';
import { Header, Table, Message} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import DisbursementRow from './DisbursementRow';
import connection from '../web3';

let web3 = connection.web3
let DISBURSE = connection.disburse;

class DisbursementList extends Component {

    state = {
        loadApp: false,
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
    
    callbackErrorReceived(err) {
        console.log('DISBURSEMENT ROW ERROR RECEIVED: ' + err);
        this.setState({errorMessage: err});
    }

    displayError() {     
        if (this.state.errorMessage.length > 0) {
            return (<Message error header="Oops!" content={this.state.errorMessage} />);
        }
    }

    componentDidMount = async (load) => {
        
        load = true;
        if (load){

            await web3.eth.net.getId();  

            var beneficiaryAddress = this.props.trustAddress;
            var topId = await DISBURSE.methods.topDisbursementId(beneficiaryAddress).call();

            var list = [];
            for (var id=1; id<=topId; id++){

                // Iterate through disburements and record the distribution ID
                var disbursement = await DISBURSE.methods.disbursements(this.props.trustAddress, id).call({from: this.props.trustAddress});
                
                var beneficiaryId = disbursement['beneficiaryId'];
                var trustAddress = disbursement['trustAddress']
                
                var beneficiary = await DISBURSE.methods.getBeneficiary(beneficiaryId).call({from: trustAddress});
                var complete = beneficiary['complete'];

                if ((complete === false) && 
                    (beneficiary.beneficiaryAddress !== '0x0000000000000000000000000000000000000000')) {
                    list.push(beneficiary);
                }
            }
    
            this.setState({disbursementList: list});

        }
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
                        parentCallback = {this.callbackUpdateTable}
                        errorCallback = {this.callbackErrorReceived}
                />
            );
        })
    }

    render() {
        return (
            <div>
                <Header sub>Below is a list of all incoming payments.  Click the Accept Button to send these funds to your private wallet.</Header>
                {this.displayError()}
                <br />
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>From Address</Table.HeaderCell>
                            <Table.HeaderCell>Amount (ETH)</Table.HeaderCell>
                            <Table.HeaderCell>Payment Date</Table.HeaderCell>
                            <Table.HeaderCell>Refund Payment</Table.HeaderCell>
                            <Table.HeaderCell>Accept Payment</Table.HeaderCell>
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
