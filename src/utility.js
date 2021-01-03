const DISBURSEV1_JSON = require('./contracts/DisburseV1.json');
const DISBURSEV1GOERLI_JSON = require('./contracts/DisburseV1Goerli.json');

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

var getDisburse = (web3) => {

    var disburse;

    //var id = getNetworkId(web3);
    //console.log('NetworkID: ' + id);
 
    web3.eth.net.getId().then(netId => {
        switch (netId) {
            case 5777:
                console.log('This is localhost');
                disburse = new web3.eth.Contract(DISBURSEV1_JSON.abi, DISBURSEV1_JSON.networks['5777'].address);
                break;
            case 1:
                console.log('This is mainnet');
                break;
            case 5:
                console.log('This is the goerli test network.');
                let CONTRACT_ADDRESS = '0x9102994DC42CFF82D60BeCe90d31B8d409Afcbd3';
                disburse = new web3.eth.Contract(DISBURSEV1GOERLI_JSON, CONTRACT_ADDRESS);
                break;
          default:
            console.log('This is an unknown network: ' + netId);
        }
    })

    // Localhost network
    var networkId = '5777';

    // Localhost
    if (true){
        disburse = new web3.eth.Contract(DISBURSEV1_JSON.abi, DISBURSEV1_JSON.networks[networkId].address);
    }
 
    console.log('DISBURSE: ' + disburse);
    return disburse;
}

export default { capitalize, timeConverter, getDisburse };