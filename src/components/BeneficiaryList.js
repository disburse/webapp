import React, { Component } from 'react';
import { Header, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import web3 from '../web3';
import BeneficiaryRow from './BeneficiaryRow';

const DisburseJSON = require('../contracts/DisburseV1.json');

class BeneficiaryList extends Component {

    state = {
        contractAddress: '',
        beneficiaryList: [],
        renderRows: ''
    } 

    componentDidMount = async () => {
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
    }
    
    renderRows() {
        // Map is a function available on arrays
        // Item represents every element in the array, which in this scenario is a Struct
        return this.state.beneficiaryList.map((item) => {

            var ethAmount = web3.utils.fromWei(item['amount'], 'ether');
            var formattedDate = item['disburseDate'];

            return( 
                <BeneficiaryRow
                        address = {item['beneficiaryAddress']}
                        amount = {ethAmount}
                        disbursement = {formattedDate}
                />
            );
        })
    }

    render() {
        return (
            <div>
                <Header size='medium'>Beneficiaries</Header>
                <Header sub>The table below lists all beneficiaries that will receive funds after their disbursement date.</Header>
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
            </div>
        );
    }
}

export default BeneficiaryList;
