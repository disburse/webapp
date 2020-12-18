import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class BeneficiaryRow extends Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.address}</Table.Cell>
                <Table.Cell>{this.props.amount}</Table.Cell>
                <Table.Cell>{this.props.disbursement}</Table.Cell>
            </Table.Row>
        );        
    }
}

export default BeneficiaryRow;