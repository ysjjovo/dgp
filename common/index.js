var rfs = require('fs').readFileSync
var artifactsDir = process.env.PROJECT_DIR + '/solidity/artifacts'
var net = require('net')
var Web3 = require('web3')
var web3 = new Web3(process.env.IPC_PATH, net);
module.exports = {
    root: process.env.ROOT_ADDR,
    web3,
    eth: web3.eth,
    bin: rfs(`${artifactsDir}/${process.env.CONTRACT}.bin`, 'utf-8'),
    abi: JSON.parse(rfs(`${artifactsDir}/${process.env.CONTRACT}.abi`, 'utf-8')),
}