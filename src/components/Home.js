import React from 'react';

const Home = () => {

    /*
    import Web3 from "web3";
    import Web3Connect from "web3connect";
    import WalletConnectProvider from "@walletconnect/web3-provider";

    // Replaces web3connect
    // import Web3Modal from "web3modal";

    <Web3Connect.Button
        network="mainnet"  // optional
        providerOptions={{
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    infuraId: "753227e9030d4656a9ef958f23d61c44" // required
                }
            }
        }}
        onConnect={(provider) => {
            const web3 = new Web3(provider); // add provider to web3
        }}
        onClose={() => {
            console.log("Web3Connect Modal Closed"); // modal has closed
        }}
    />
    */

    return (
       <div>
          <h1>Home</h1>
           <p>Test Web3 Connection</p>
           
       </div>
    );
}
 
export default Home;