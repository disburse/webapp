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
            
            var readyToDisburse = await disburse.methods.readyToDisburse(trustAddress, beneficiaryId).call({from: trustAddress});
            if (readyToDisburse){
                console.log("DISBURSE INITIATED (id): " + beneficiaryId);
                await disburse.methods.disburseFunds(trustAddress, beneficiaryId).send({from: trustAddress});
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
        var ready = await disburse.methods.readyToDisburse(trustAddress, beneficiaryId).call({from: trustAddress});
        this.setState({readyToDisburse: ready});
    }

    timeConverter = () => {
        var unix_timestamp = this.props.beneficiary['disburseDate'];
        var a = new Date(unix_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    render() {

        // Retrieve key variables from beneficiary
        //var beneficiaryId = this.props.beneficiary['id'];
        var beneficiaryAddress = this.props.beneficiary['beneficiaryAddress'];
        var beneficiaryAmount = this.props.beneficiary['amount'];
        
        return (
            <Table.Row>
                <Table.Cell>{beneficiaryAddress}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(beneficiaryAmount, 'ether')}</Table.Cell>
                <Table.Cell>{this.timeConverter()}</Table.Cell>
                <Table.Cell>
                    {this.state.readyToDisburse ? null : (
                        <Button 
                            loading={this.state.loading} 
                            color='red' 
                            basic 
                            onClick={this.onClickRemove}>Cancel</Button>
                    )}
                </Table.Cell> 
                <Table.Cell>
                    <Button 
                        loading={this.state.loading} 
                        color='teal' 
                        basic 
                        onClick={this.onClickDisburse}>
                        &nbsp;&nbsp;&nbsp;Send&nbsp;&nbsp;&nbsp; 
                    </Button>
                </Table.Cell> 
            </Table.Row>
        );        
    }
}

export default BeneficiaryRow;