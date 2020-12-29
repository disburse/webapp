import web3 from './web3';

const DISBURSEV1_JSON = require('./contracts/DisburseV1.json');
const DISBURSEV1GOERLI_JSON = require('./contracts/DisburseV1Goerli.json');
var CONTRACT_ADDRESS;
var ABI;

const network = 'localhost';
//const network = 'goerli';
var networkId = '5777';

var getNetworkId = async () => {
    networkId = await web3.eth.net.getId();  
}

getNetworkId();

if (network === 'localhost'){
    ABI = DISBURSEV1_JSON.abi;
    CONTRACT_ADDRESS = DISBURSEV1_JSON.networks[networkId].address;
}
else if (network === 'goerli') {
    ABI = DISBURSEV1GOERLI_JSON;
    CONTRACT_ADDRESS = '0x9102994DC42CFF82D60BeCe90d31B8d409Afcbd3';
}

console.log('CONTRACT ADDRESS: ' + CONTRACT_ADDRESS);

export default { ABI, CONTRACT_ADDRESS };


// const disburse = new web3.eth.Contract(DisburseJSON.abi, this.state.contractAddress);
// const disburse = new web3.eth.Contract(contract.ABI, contract.CONTRACT_ADDRESS);