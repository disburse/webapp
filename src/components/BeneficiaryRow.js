import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

class BeneficiaryRow extends Component {

    state = {
        web3: null,
        disburse: null,
        amount: '',
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
        
            var readyToDisburse = await this.props.disburse.methods.readyToDisburse(trustAddress, beneficiaryId).call({from: trustAddress});
            if (readyToDisburse){
                console.log("DISBURSE INITIATED (id): " + beneficiaryId);
                await this.props.disburse.methods.disburseFunds(trustAddress, beneficiaryId).send({from: trustAddress});
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

    onClickCancel = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            var beneficiaryId = this.props.beneficiary['id'];
            var trustAddress = this.props.beneficiary['trustAddress'];

            console.log("REMOVE BENEFICIARY (id): " + beneficiaryId);
           
            await this.props.disburse.methods.removeBeneficiary(beneficiaryId).send({from: trustAddress});
        
            this.props.parentCallback();
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
            this.props.errorCallback();
        }

        this.setState({loading: false}); 
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

    componentDidMount = async () => {

        if (this.props.web3 !== undefined){

            // This component is called once the BeneficiaryList component loads
            await this.props.web3.eth.net.getId();  
            
            var beneficiaryId = this.props.beneficiary['id'];
            var trustAddress = this.props.beneficiary['trustAddress'];
            var ready = await this.props.disburse.methods.readyToDisburse(trustAddress, beneficiaryId).call({from: trustAddress});
            this.setState({readyToDisburse: ready});

            var beneficiaryAmount = this.props.beneficiary['amount'];
            var etherAmount = this.props.web3.utils.fromWei(beneficiaryAmount, 'ether')
            this.setState({amount: etherAmount});
        }
    }

    render() {

        // Retrieve key variables from beneficiary
        //var beneficiaryId = this.props.beneficiary['id'];
        var beneficiaryAddress = this.props.beneficiary['beneficiaryAddress'];
        var cancelAllowed = this.props.beneficiary['cancelAllowed'];

        return (
            <Table.Row>
                <Table.Cell>{beneficiaryAddress}</Table.Cell>
                <Table.Cell>{this.state.amount}</Table.Cell>
                <Table.Cell>{this.timeConverter()}</Table.Cell>
                <Table.Cell>{cancelAllowed.toString()}</Table.Cell>
                <Table.Cell>
                    {cancelAllowed && !this.state.readyToDisburse ? (
                        <Button 
                            loading={this.state.loading} 
                            color='red' 
                            basic 
                            onClick={this.onClickCancel}>Cancel</Button>
                    ) : null}
                </Table.Cell> 
                <Table.Cell>
                    {this.state.readyToDisburse ? (
                        <Button 
                            loading={this.state.loading} 
                            color='teal' 
                            basic 
                            onClick={this.onClickDisburse}>
                            &nbsp;&nbsp;&nbsp;Send&nbsp;&nbsp;&nbsp; 
                        </Button>) : null}
                </Table.Cell> 
            </Table.Row>
        );        
    }
}

export default BeneficiaryRow;