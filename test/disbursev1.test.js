import Web3 from "web3";
import utility from '../src/utility';

const assert = require('assert');

var web3;
var disburse;
var accounts;

// Everytime you restart the Ganache server:
// 1) Make sure that the contract has been deployed to the local ganache network
// 2) Make sue that latest json file has been saved to the webapp project (via ABI.cmd)

describe("Basic Integration Test: Disburse V1", () => {

    beforeEach(async () => {
        // Connect to local Ganache server
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        const networkId = await web3.eth.net.getId();
        disburse = utility.getDisburse(web3, networkId);
        accounts = await web3.eth.getAccounts();
    });

    it("template", async () => {
        try { 
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("getTrustBalance", async () => {
        try { 
            await disburse.methods.getTrustBalance(accounts[0]).call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("getBeneficiaryBalance", async () => {
        try { 
            await disburse.methods.getBeneficiaryBalance(accounts[0]).call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("getContractBalance", async () => {
        try { 
            await disburse.methods.getContractBalance().call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("getBeneficiaryCount", async () => {
        try { 
            await disburse.methods.getBeneficiaryCount().call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("getTopBeneficiaryId", async () => {
        try { 
            await disburse.methods.getTopBeneficiaryId().call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("getBeneficiaryId", async () => {
        try { 
            await disburse.methods.getBeneficiaryId(accounts[0]).call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("getTopDisbursementId", async () => {
        try { 
            await disburse.methods.getTopDisbursementId().call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("getDisbursementCount", async () => {
        try { 
            await disburse.methods.getDisbursementCount(accounts[0]).call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("refundTrust", async () => {
        try { 
            await disburse.methods.refundTrust(0).call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("removeBeneficiary", async () => {
        try { 
            await disburse.methods.removeBeneficiary(0).call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("getDisbursementId", async () => {
        try { 
            await disburse.methods.getDisbursementId(accounts[0],0).call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("readyToDisburse", async () => {
        try { 
            await disburse.methods.readyToDisburse(accounts[0],0).call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("disburseFunds", async () => {
        try { 
            await disburse.methods.disburseFunds(accounts[0],0).call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("withdrawAmountFromTrustBalance", async () => {
        try { 
            await disburse.methods.withdrawAmountFromTrustBalance(0).send({from: accounts[0]});
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("getBeneficiary", async () => {
        try { 
            await disburse.methods.getBeneficiary(0).call();
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("contributeToTrust", async () => {
        try { 
            await disburse.methods.contributeToTrust().send({from: accounts[0], value: 1});
            assert(true);
        } catch {
            assert(false);
        }
    });

    it("addBeneficiary", async () => {
        try { 
            var trustAddress = accounts[0];
            var beneficiaryAddress = accounts[1];
            var delayInSeconds = 60;
            var amount = web3.utils.toWei('1', 'ether');
            var weiAmount = web3.utils.toWei('10', 'ether');
            
            await disburse.methods.contributeToTrust().send({ from: trustAddress, value: weiAmount });

            await disburse.methods.addBeneficiary(
                                beneficiaryAddress, 
                                delayInSeconds, 
                                amount,
                                true).send({from: trustAddress, gas:3000000});

            var id = await disburse.methods.getBeneficiaryId(beneficiaryAddress).call({from: trustAddress});
            await disburse.methods.removeBeneficiary(id).send({from: trustAddress});
            assert(true);
        } catch(err) {
            console.log(err);
            assert(false);
        }
    });
    
    it("withdrawTrustBalance", async () => {
        try { 
            await disburse.methods.withdrawTrustBalance().send({from: accounts[0]});
            assert(true);
        } catch {
            assert(false);
        }
    });

    /*
    it("emergency", async () => {
        try { 
            //function emergency() public restricted {
            await disburse.methods.emergency().send({from: accounts[0]});
            assert(true);
        } catch {
            assert(false);
        }
    });
    */
});

