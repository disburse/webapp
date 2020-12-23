import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class DisbursementRow extends Component {

    // state = {} 

    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.id}</Table.Cell>
                <Table.Cell>{this.props.address}</Table.Cell>
                <Table.Cell>{this.props.amount}</Table.Cell>
                <Table.Cell>{this.props.disbursement}</Table.Cell>
            </Table.Row>
        );        
    }
}

export default DisbursementRow;