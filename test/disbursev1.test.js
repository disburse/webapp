import Web3 from "web3";
import utility from '../src/utility';

const assert = require('assert');

var disburse;
var accounts;

describe("Integration with Disburse V1", () => {

    beforeEach(async () => {
      //  const web3 = new Web3(provider);
      //  const networkId = await web3.eth.net.getId();

      //  disburse = utility.getDisburse(web3, networkId);
      //  accounts = await web3.eth.getAccounts();
    });

    it("startup test", async () => {
        assert(true);
    });

    it("can retrieve empty trust balance", async () => {
        // var balance = await disburse.methods.getTrustBalance(accounts[0]).call();
        // assert(balance == 0);
    });
 
});