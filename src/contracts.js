import connection from '../web3';

const DISBURSEV1_JSON = require('./contracts/DisburseV1.json');
const DISBURSEV1GOERLI_JSON = require('./contracts/DisburseV1Goerli.json');

let CONTRACT_ADDRESS;
let ABI;
let NETWORK_ID = '5777';
let DISBURSE;

// The await operator is used to wait for a Promise. It can be used inside an Async block only. 
// The keyword Await makes JavaScript wait until the promise returns a result. It has to be noted 
// that it only makes the async function block wait and **NOT** the whole program execution.

var loadContract = async () => {

    let web3 = connection.web3

    NETWORK_ID = await web3.eth.net.getId();  
    console.log('RETREIVED NETWORK ID: ' + NETWORK_ID);

    console.log('DEFAULT NETWORK ID: ' + NETWORK_ID);

    // Localhost
    if (NETWORK_ID === '5777'){
        ABI = DISBURSEV1_JSON.abi;
        CONTRACT_ADDRESS = DISBURSEV1_JSON.networks[NETWORK_ID].address;
    }
    // Goerli
    else if (NETWORK_ID === '5') {
        ABI = DISBURSEV1GOERLI_JSON;
        CONTRACT_ADDRESS = '0x9102994DC42CFF82D60BeCe90d31B8d409Afcbd3';
    }

    DISBURSE = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    return DISBURSE;

}

export default loadContract;