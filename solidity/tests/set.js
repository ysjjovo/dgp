var ipc = '/home/lin/eth/data/geth.ipc'
var admin = '0xbE6c47FEE054436222e317e3ff437C301376d237'
var code = require('fs').readFileSync(require('path').resolve(__dirname) + '/../artifacts/Storage.bin', 'utf-8')
var Web3 = require('web3')
var net = require('net')
var web3 = new Web3(ipc, net) // mac os path
web3.eth.defaultAccount = admin
console.log(web3.eth.defaultAccount)
