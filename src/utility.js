import axios from 'axios';
import BN from 'bignumber.js'

const URL = 'https://www.etherchain.org/api/gasPriceOracle'

// Page 172: Example estimating gas and retrieving gas price
var getGasPrice = async () => {
    // Sample output from URL
    // {"safeLow":50,"standard":51.1,"fast":62,"fastest":78}
    const { data: gasData } = await axios.get(URL);
    const bn = new BN(gasData.fast);
    return bn.shiftedBy(9).toString(10);
}

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

export default {getGasPrice,
                capitalize, 
                timeConverter };