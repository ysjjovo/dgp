
var rfs = require('fs').readFileSync
var net = require('net')
var Web3 = require('web3')
var web3 = new Web3(process.env.IPC_PATH, net)

password = 'aaa'
keystorePath = '/home/lin/eth/data/keystore/UTC--2022-05-29T08-14-27.367547800Z--be6c47fee054436222e317e3ff437c301376d237'
json = JSON.parse(rfs(keystorePath))
console.log(web3.eth.accounts.wallet.decrypt([json], password))
