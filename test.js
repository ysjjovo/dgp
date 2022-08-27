var Web3 = require('web3')
var web3 = new Web3()
const wallets = web3.eth.accounts.wallet.create(1)
console.log('adress:', wallets[0].address)
privateKey = wallets[0].privateKey
console.log('privateKey:', privateKey) 
web3.eth.personal.importRawKey(privateKey, '111')
