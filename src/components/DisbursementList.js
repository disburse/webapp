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

            if ((complete === true) && 
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
                <Header sub>Below is a list of all incoming disbursements.  Click the Receive Button to process them and receive the funds back into your account/wallet.</Header>
                {this.displayError()}
                <br />
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Sent From</Table.HeaderCell>
                            <Table.HeaderCell>Amount (ETH)</Table.HeaderCell>
                            <Table.HeaderCell>Disbursement</Table.HeaderCell>
                            <Table.HeaderCell>Receive</Table.HeaderCell>
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
