var Web3 = require('web3');
var net = require('net');
var web3 = new Web3('/home/lin/eth/data/geth.ipc', net); // mac os path
web3.eth.getBalance("0xbE6c47FEE054436222e317e3ff437C301376d237").then(console.log)