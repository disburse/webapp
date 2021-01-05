import React, { Component } from 'react';
import { Header, Table, Label, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import BeneficiaryRow from './BeneficiaryRow';

class BeneficiaryList extends Component {

    state = {
        web3: null,
        disburse: null,        
        beneficiaryList: [],
        renderRows: '',
        allocatedFunds: '',
        errorMessage: '',
        loading: false
    } 

    constructor(props) {
        super(props)

        // When the callback is received from the BeneficiaryRow component, it is binded
        // to the current instance of this component.  Otherwise, set state will not work.
        this.callbackErrorReceived = this.callbackErrorReceived.bind(this)
    }

    callbackUpdateTable = () => {        
        console.log("PARENT BENEFICIARY LIST CALLED (callbackUpdateTable)");

        // Row removed, re-rendering table of beneficiaries
        this.componentDidMount();

        // Call back parent component to update available funds (addBeneficiary)
        this.props.parentForceUpdate();
    }

    updateAllocatedFundsBalance = async () => {

        if (this.props.trustAddress != null){

            // Update allocated funds balance
            var weiBalance = await this.state.disburse.methods.getBeneficiaryBalance(this.props.trustAddress).call();

            var etherBalance = 0;
            if (weiBalance > 0){
                etherBalance = this.state.web3.utils.fromWei(weiBalance, 'ether');
            }
            
            this.setState({ allocatedFunds: etherBalance });
        }
    }

    callbackErrorReceived(err) {
        console.log('BENEFICIARY ROW ERROR RECEIVED: ' + err);
        this.setState({errorMessage: err});
    }

    displayError() {     
        if (this.state.errorMessage.length > 0) {
            return (<Message error header="Oops!" content={this.state.errorMessage} />);
        }
    }

    componentDidMount = async (web3, disburse) => {
        
        if (web3 !== undefined && disburse !== undefined){

            this.setState({web3: web3});
            this.setState({disburse: disburse});

            await web3.eth.net.getId();  
            
            var topId = await this.state.disburse.methods.getTopBeneficiaryId().call({from: this.props.trustAddress});

            var list = [];
            for (var id=1; id<=topId; id++){
                var beneficiary = await this.state.disburse.methods.getBeneficiary(id).call({from: this.props.trustAddress});
                var complete = beneficiary['complete'];
                //var cancel = beneficiary['cancelAllowed'];
                //console.log('BENEFICIARY LIST (id): ' + id + ' ' + complete);
                //console.log('BENEFICIARY LIST (id): ' + id + ' ' + cancel);

                if ((complete === false) && 
                (beneficiary.beneficiaryAddress !== '0x0000000000000000000000000000000000000000')) {
                    list.push(beneficiary);
                }
            }

            this.setState({errorMessage: ''});
            this.setState({beneficiaryList: list});

            // Update allocated funds balance
            this.updateAllocatedFundsBalance();
        }
    }

    renderRows() {
        // Map is a function available on arrays
        // Item represents every element in the array, which in this scenario is a Struct
        return this.state.beneficiaryList.map((item, index) => {
            return( 
                <BeneficiaryRow
                        ref = "cBeneficiaryRow"
                        web3 = {this.state.web3}
                        disburse = {this.state.disburse}
                        key = {index}
                        beneficiary = {item}
                        parentCallback = {this.callbackUpdateTable}
                        errorCallback = {this.callbackErrorReceived}
                />
            );
        })
    }

    render() {
        return (
            <div>
                <Header sub>
                    3. Below is a list of all addresses that will receive funds after 
                    their payment date.  Future dated payments can be cancelled prior to their payment date.  Once 
                    the payment date has passed, the payment can no longer be cancelled.  
                </Header>
                <Header sub>                      
                    The receiving address can accept these payments from their account once the payment date has passed.
                    Alternatively, the funding account can also send these funds once the payment date has passed.
                </Header>
                {this.displayError()}
                <br />
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Receiving Address</Table.HeaderCell>
                            <Table.HeaderCell>Amount (ETH)</Table.HeaderCell>
                            <Table.HeaderCell>Payment Date</Table.HeaderCell>
                            <Table.HeaderCell>Cancellation Allowed</Table.HeaderCell>
                            <Table.HeaderCell>Cancel Payment</Table.HeaderCell>
                            <Table.HeaderCell>Send Payment</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>
                <Label size='large' color='teal'>Upcoming Payments: {this.state.allocatedFunds} ETH</Label>
                <br />
            </div>
        );
    }
}

export default BeneficiaryList;
