import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../web3';

class DisbursementRow extends Component {

    // state = {} 

    render() {

        // Retrieve key variables from beneficiary
        var beneficiaryId = this.props.beneficiary['id'];
        var beneficiaryAddress = this.props.beneficiary['beneficiaryAddress'];
        var beneficiaryAmount = this.props.beneficiary['amount'];
        var beneficiaryDisbursement = this.props.beneficiary['disburseDate'];

        return (
            <Table.Row>
                <Table.Cell>{beneficiaryId}</Table.Cell>
                <Table.Cell>{beneficiaryAddress}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(beneficiaryAmount, 'ether')}</Table.Cell>
                <Table.Cell>{beneficiaryDisbursement}</Table.Cell>
            </Table.Row>
        );        
    }
}

export default DisbursementRow;