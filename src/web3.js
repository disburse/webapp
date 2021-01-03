//import Web3 from "web3";
const DISBURSEV1_JSON = require('./contracts/DisburseV1.json');
const DISBURSEV1GOERLI_JSON = require('./contracts/DisburseV1Goerli.json');
//let web3;
let disburse;

// Function to load metamask wallet
/*
var loadWeb3 = () => {

    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
    // Check for legacy metamask plugin
    else if (window.web3) {
        web3 = window.web3;
        console.log("Injected web3 detected.");
    }
    // Fallback to localhost; use dev console port by default...
    else {
        // Connect to infura may be a more reasonable choice
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
        web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
    }

    console.log('METAMASK COMPLETE');

    return web3;
}
*/

// Function to load disburse contract
var loadContract = (web3) => {

    // Localhost network
    let NETWORK_ID = '5777';
    //NETWORK_ID = await web3.eth.net.getId();  
    //console.log('RETREIVED NETWORK ID: ' + NETWORK_ID);
    //console.log('DEFAULT NETWORK ID: ' + NETWORK_ID);

    // Localhost
    if (true){
        disburse = new web3.eth.Contract(DISBURSEV1_JSON.abi, DISBURSEV1_JSON.networks[NETWORK_ID].address);
    }
    // Goerli
    else if (NETWORK_ID === '5') {
        let CONTRACT_ADDRESS = '0x9102994DC42CFF82D60BeCe90d31B8d409Afcbd3';
        disburse = new web3.eth.Contract(DISBURSEV1GOERLI_JSON, CONTRACT_ADDRESS);
    }
    else{
        console.log('CONTRACT LOADING ERROR');
    }

    return disburse;
}

//web3 = loadWeb3();

//disburse = loadContract();

export default loadContract;