import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

class BeneficiaryRow extends Component {

    onClickRemove = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            console.log("REMOVE BENEFICIARY");
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false}); 
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.address}</Table.Cell>
                <Table.Cell>{this.props.amount}</Table.Cell>
                <Table.Cell>{this.props.disbursement}</Table.Cell>
                <Table.Cell>
                    <Button color='red' basic onClick={this.onClickRemove}>Remove</Button>
                </Table.Cell> 
            </Table.Row>
        );        
    }
}

export default BeneficiaryRow;