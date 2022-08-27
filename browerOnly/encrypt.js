var Web3 = require('web3')
var web3 = new Web3()
const wallet = web3.eth.accounts.wallet.add('0x1bf7e3f22560c8710e768d937fbfb11a2d830ce35ef39a74270eee91c993608e')
console.log(web3.eth.accounts.wallet.encrypt('1'))