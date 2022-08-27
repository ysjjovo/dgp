var Web3 = require('web3')
var web3 = new Web3()
const account = web3.eth.accounts.create()
console.log('adress:', account.address)
console.log('privateKey:', account.privateKey)

// console.log('address1:', web3.eth.accounts.privateKeyToAccount(account.privateKey))