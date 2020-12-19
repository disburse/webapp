import React, { Component } from 'react';
import { Header, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import web3 from '../web3';
import BeneficiaryRow from './BeneficiaryRow';

const DisburseJSON = require('../contracts/DisburseV1.json');

class BeneficiaryList extends Component {

    state = {
        contractAddress: ''
    } 

    componentDidMount = async () => {
        const networkId = await web3.eth.net.getId();  
        const contract = DisburseJSON.networks[networkId];
        this.setState({contractAddress: contract.address});


    }
    
    renderRows() {
        return(
            <BeneficiaryRow  
                address = '1'
                amount = '2'
                disbursement = '3'
            />
        );

        /*
        return this.props.beneficiaries.map((request, index) => {
            return( 
                <BeneficiaryRow
                        // This syntax is how you pass data to components
                        key={index}    
                        id={index}
                        request={request}
                        address={this.props.address}
                />
            );
        })
        */
        
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
                            <Table.HeaderCell>Amount</Table.HeaderCell>
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
