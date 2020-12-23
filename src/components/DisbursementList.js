import React, { Component } from 'react';
import { Header, Table, Message, Divider } from 'semantic-ui-react';
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
            console.log('BENEFICIARY COMPLETE (id): ' + id + ' ' + complete);

            if ((complete === true) && 
               (beneficiary.beneficiaryAddress !== '0x0000000000000000000000000000000000000000')) {
            
                // TODO: Complete work on disbursement process
                //var readyToDisburse = await disburse.methods.readyToDisburse(id).call({from: this.props.trustAddress});
                //await disburse.methods.disburseFunds(id).send({from: this.props.trustAddress});

                list.push(beneficiary);
            }
    
        }

        this.setState({disbursementList: list});
    }
    
    renderRows() {
        // Map is a function available on arrays
        // Item represents every element in the array, which in this scenario is a Struct
        return this.state.disbursementList.map((item, index) => {

            var ethAmount = web3.utils.fromWei(item['amount'], 'ether');
            var formattedDate = item['disburseDate'];

            return( 
                <DisbursementRow
                        ref = "cDisbursementRow"
                        key = {index}
                        id = {item['id']}
                        address = {item['beneficiaryAddress']}
                        amount = {ethAmount}
                        disbursement = {formattedDate}
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
                <Divider horizontal>
                    <Header size='medium'>Completed Disbursements</Header>
                </Divider>
                <Header sub>The table below lists all disbursements that have already occurred.</Header>
                {this.displayError()}
                <br />
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Amount (ETH)</Table.HeaderCell>
                            <Table.HeaderCell>Disbursement</Table.HeaderCell>
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
