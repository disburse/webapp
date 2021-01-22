import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import network from '../network';

class Balance extends Component {

    state = {
        web3: null,
        disburse: null, 
        balance: ''
    } 

    componentDidMount = async () => {

        /*
        if (web3 !== undefined && disburse !== undefined){
            this.setState({web3: web3});
            this.setState({disburse: disburse});

            var weiBalance = await disburse.methods.getContractBalance().call();
            var etherBalance = this.state.web3.utils.fromWei(weiBalance.toString(), 'ether');
            this.setState({balance: etherBalance});
        }
        */
        
        let web3 = network.getWeb3();
        let disburse = network.getDisburse();
        this.setState({web3});
        this.setState({disburse});

        var weiBalance = await disburse.methods.getContractBalance().call();
        var etherBalance = this.state.web3.utils.fromWei(weiBalance.toString(), 'ether');
        this.setState({balance: etherBalance});
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