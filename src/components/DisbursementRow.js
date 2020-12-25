import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../web3';

class DisbursementRow extends Component {

    state = {
        errorMessage: '',
        loading: false
    } 

    componentDidMount = async () => {
    }

    onClickReceive = async (event) => {

    }

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
                <Table.Cell>
                    <Button
                        loading={this.state.loading} 
                        color='teal'
                        basic
                        onClick={this.onClickReceive}>Receive</Button>
                </Table.Cell>
            </Table.Row>
        );        
    }
}

export default DisbursementRow;