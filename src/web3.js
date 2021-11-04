import Web3 from "web3";

// //injecting metamask web3 provider into our app
const web3 = new Web3(window.ethereum);
window.ethereum.enable();
export default web3;
