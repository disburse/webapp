const Web3 = require("web3");
const DISBURSEV1_JSON = require('./contracts/DisburseV1.json');

//let NETWORK_ID = '1';     // Mainnet
//let NETWORK_ID = '5777';  // Localhost
let NETWORK_ID = '5';       // Goerli
let web3;

var getWeb3 = () => {
    // If web3 has not be previously initialized
    if (!web3){
        if (window.ethereum){
            console.log('WINDOW.ETHEREUM')
            web3  = new Web3(window.ethereum);
            window.ethereum.enable();
        }
        else if (window.web3){
            console.log('WINDOW.WEB3')
            web3 = new Web3(window.web3.currentProvider);
            // web3 = window.web3;
        }
        else{
            console.log('INFURA')
            // If metamask is not available, then use the infura node
            web3 = getInfura();
        }
    }
    return web3;
}

var getInfura = () => {
    var infura;
    var networkId = getNetwork();

    switch (networkId) {
        case '5777':
            infura = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
            break;
        case '1':
            infura = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/753227e9030d4656a9ef958f23d61c44"));
            break;
        case '5':
            //console.log('This is the goerli test network.');
            infura = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/5bcd325e39b94eef8c0f11fc550ccf9e"));
            break;
        default:
            console.log('This is an unknown network: ' + networkId);
    }
    return infura;
}

var hasProvider = () => {
    return !!Web3.givenProvider;
}

var getNetwork = async () => {
    NETWORK_ID = await web3.eth.net.getId();
    console.log('LOAD NETWORK ID: ' + NETWORK_ID);
    return NETWORK_ID;
}

var getDisburse = () => { 
    if (!web3) { web3 = getWeb3(); }
    var disburse = new web3.eth.Contract(DISBURSEV1_JSON.abi, DISBURSEV1_JSON.networks[NETWORK_ID].address);
    return disburse;
}

var getAccount = async () => {
    const accounts = await window.ethereum.enable();
    return accounts[0];
}

var getBlockNumber = async () => {
    return web3.eth.getBlockNumber();
}

export default {hasProvider,
                getNetwork, 
                getWeb3,
                getDisburse,
                getAccount,
                getBlockNumber };