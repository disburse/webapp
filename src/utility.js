const Web3 = require("web3");

const DISBURSEV1_JSON = require('./contracts/DisburseV1.json');

//let NETWORK_ID = 1;     // Mainnet
let NETWORK_ID = 5;     // Goerli
//let NETWORK_ID = 5777;  // Localhost

var capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

var timeConverter = (disburseDate) => {
    var a = new Date(disburseDate * 1000);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    //var hour = a.getHours();
    //var min = a.getMinutes();
    //var sec = a.getSeconds();
    //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    var time = month + ' ' + date + ', ' + year;
    return time;
}
 
// Function to load disburse contract
// This function cannot be async, otherwise the calling code will continue to 
// execute before the function is finished loading.

var loadNetwork = async (web3) => {
    NETWORK_ID = await web3.eth.net.getId();
    return NETWORK_ID;
}

var getDisburse = (web3) => {
 
    var disburse;

    if (web3 !== undefined){

        switch (NETWORK_ID) {
            case 5777:
                //console.log('This is localhost');
                disburse = new web3.eth.Contract(DISBURSEV1_JSON.abi, DISBURSEV1_JSON.networks['5777'].address);
                break;
            case 1:
                //console.log('This is mainnet');
                disburse = new web3.eth.Contract(DISBURSEV1_JSON.abi, DISBURSEV1_JSON.networks['1'].address);
                break;
            case 5:
                //console.log('This is the goerli test network.');
                disburse = new web3.eth.Contract(DISBURSEV1_JSON.abi, DISBURSEV1_JSON.networks['5'].address);
                break;
            default:
            console.log('This is an unknown network: ' + NETWORK_ID);
        }
    }
    return disburse;
}

var getInfura = (networkId) => {

    var infura;

    switch (networkId) {
        case 5777:
            infura = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
            break;
        case 1:
            infura = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/753227e9030d4656a9ef958f23d61c44"));
            break;
        case 5:
            //console.log('This is the goerli test network.');
            infura = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/5bcd325e39b94eef8c0f11fc550ccf9e"));
            break;
        default:
            console.log('This is an unknown network: ' + networkId);
    }
 
    return infura;
}

var getWeb3 = () => {

    var web3;

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
        web3 = getInfura(NETWORK_ID);
    }

    return web3;
}

export default {capitalize, 
                timeConverter,
                loadNetwork, 
                getWeb3,
                getDisburse };