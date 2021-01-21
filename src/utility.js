const Web3 = require("web3");
const DISBURSEV1_JSON = require('./contracts/DisburseV1.json');

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

/*
var getNetworkId = async (web3) => {
    var id = await web3.eth.net.getId();
    return id;
}
*/

var getDisburse = (web3Object, networkId) => {
 
    var disburse;

    switch (networkId) {
        case 5777:
            //console.log('This is localhost');
            disburse = new web3Object.eth.Contract(DISBURSEV1_JSON.abi, DISBURSEV1_JSON.networks['5777'].address);
            break;
        case 1:
            //console.log('This is mainnet');
            disburse = new web3Object.eth.Contract(DISBURSEV1_JSON.abi, DISBURSEV1_JSON.networks['1'].address);
            break;
        case 5:
            //console.log('This is the goerli test network.');
            disburse = new web3Object.eth.Contract(DISBURSEV1_JSON.abi, DISBURSEV1_JSON.networks['5'].address);
            break;
        default:
        console.log('This is an unknown network: ' + networkId);
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

var getMetaMask = () => {

    var metamask;

    if (window.ethereum){
        metamask  = new Web3(window.ethereum)
    }
    else if (window.web3){
        metamask = new Web3(window.web3.currentProvider);
    }

    //else{
    //    metamask = getInfura(networkId);
    //}

    return metamask;
}

let web3;
var setWeb3 = (web3Object) => { web3 = web3Object; }
var getWeb3 = () => { return web3; }

let networkId;
var setNetworkId = (id) => { networkId = id; }
var getNetworkId = () => { return networkId; }

export default {capitalize, 
                timeConverter, 
                setWeb3, 
                getWeb3,
                getInfura,
                getMetaMask,
                getDisburse,
                setNetworkId,
                getNetworkId };