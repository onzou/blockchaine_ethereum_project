import web3 from "./web3";

const address = "0x8D123EaA46bB23370A9eC17EAA7927193C4E3f9e";

const abi = [{"constant":false,"inputs":[{"name":"organizationAddress","type":"address"}],"name":"donate","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getOrganizationLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"description","type":"string"}],"name":"createOrganization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orginations","outputs":[{"name":"id","type":"address"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];


export default new web3.eth.Contract(abi,address);