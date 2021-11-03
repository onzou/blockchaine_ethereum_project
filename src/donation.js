import web3 from "./web3";

const address = "0x02c78543D18B80A1f477DD8f6949FC6a37913E3C";

const abi = [
    {"constant":false,"inputs":[{"name":"organizationAddress","type":"address"}],"name":"donate","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},
    {"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"residence","type":"string"}],"name":"createOrganization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":true,"inputs":[],"name":"getOrganizationLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orginations","outputs":[{"name":"id","type":"address"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"residence","type":"string"},{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}
];


export default new web3.eth.Contract(abi,address);