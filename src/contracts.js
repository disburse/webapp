const DISBURSEV1_JSON = require('./contracts/DisburseV1.json');
const DISBURSEV1GOERLI_JSON = require('./contracts/DisburseV1Goerli.json');

// Function to load disburse contract
// This function cannot be async, otherwise the calling code will continue to 
// execute before the function is finished loading.
var loadContract = (web3) => {

    var disburse;

    // Localhost network
    var networkId = '5777';

    // Localhost
    if (true){
        disburse = new web3.eth.Contract(DISBURSEV1_JSON.abi, DISBURSEV1_JSON.networks[networkId].address);
    }
    // Goerli
    else if (networkId === '5') {
        let CONTRACT_ADDRESS = '0x9102994DC42CFF82D60BeCe90d31B8d409Afcbd3';
        disburse = new web3.eth.Contract(DISBURSEV1GOERLI_JSON, CONTRACT_ADDRESS);
    }
    else{
        console.log('CONTRACT LOADING ERROR');
    }

    console.log('DISBURSE: ' + disburse);
    return disburse;
}

export default loadContract;