import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../web3';

const DisburseJSON = require('../contracts/DisburseV1.json');

class BeneficiaryRow extends Component {

    state = {
        readyToDisburse: false,
        errorMessage: '',
        loading: false
    } 

    onClickDisburse = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            var beneficiaryId = this.props.beneficiary['id'];
            var trustAddress = this.props.beneficiary['trustAddress'];

            console.log("DISBURSE TO BENEFICIARY (id): " + beneficiaryId);

            const disburse = new web3.eth.Contract(DisburseJSON.abi, this.props.contractAddress);
            
            var readyToDisburse = await disburse.methods.readyToDisburse(beneficiaryId).call({from: trustAddress});
            if (readyToDisburse){
                console.log("DISBURSE INITIATED (id): " + beneficiaryId);
                await disburse.methods.disburseFunds(beneficiaryId).send({from: trustAddress});
                this.props.parentCallback();
            }
            else{
                this.setState({ errorMessage: 'Disbursement deadline has not passed yet.' });
                this.props.errorCallback(this.state.errorMessage);
            }
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
            this.props.errorCallback(this.state.errorMessage);
        }

        this.setState({loading: false}); 
    }

    onClickRemove = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            var beneficiaryId = this.props.beneficiary['id'];
            var trustAddress = this.props.beneficiary['trustAddress'];

            console.log("REMOVE BENEFICIARY (id): " + beneficiaryId);

            const disburse = new web3.eth.Contract(DisburseJSON.abi, this.props.contractAddress);
            
            await disburse.methods.removeBeneficiary(beneficiaryId).send({from: trustAddress});
        
            this.props.parentCallback();
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
            this.props.errorCallback();
        }

        this.setState({loading: false}); 
    }

    componentDidMount = async () => {
        const networkId = await web3.eth.net.getId();  
        const contract = DisburseJSON.networks[networkId];
        this.setState({contractAddress: contract.address});

        const disburse = new web3.eth.Contract(DisburseJSON.abi, this.state.contractAddress);
        var beneficiaryId = this.props.beneficiary['id'];
        var trustAddress = this.props.beneficiary['trustAddress'];
        var ready = await disburse.methods.readyToDisburse(beneficiaryId).call({from: trustAddress});
        this.setState({readyToDisburse: ready});
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
                    {this.state.readyToDisburse ? null : (
                        <Button 
                            loading={this.state.loading} 
                            color='red' 
                            basic 
                            onClick={this.onClickRemove}>Remove</Button>
                    )}
                </Table.Cell> 
                <Table.Cell>
                    <Button 
                        loading={this.state.loading} 
                        color='teal' 
                        basic 
                        onClick={this.onClickDisburse}>Disburse</Button>
                </Table.Cell> 
            </Table.Row>
        );        
    }
}

export default BeneficiaryRow;