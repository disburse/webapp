import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';

class Balance extends Component {

    state = {
        web3: null,
        disburse: null, 
        balance: ''
    } 

    componentDidMount = async (web3, disburse) => {

        if (web3 !== undefined && disburse !== undefined){
            this.setState({web3: web3});
            this.setState({disburse: disburse});

            var weiBalance = await disburse.methods.getContractBalance().call();
            var etherBalance = this.state.web3.utils.fromWei(weiBalance.toString(), 'ether');
            this.setState({balance: etherBalance});
        }
    }

    render() {
        return (
            <div>
                <Label size='large' color='teal'>Total Assets Under Management: {this.state.balance} ETH</Label>
            </div>
        );
    }

}

export default Balance;