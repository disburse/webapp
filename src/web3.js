//import Web3 from "web3";
let web3;

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

//web3 = loadWeb3();

export default web3;