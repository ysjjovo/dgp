(async function () {
   var comm = require('../../common')
   // var r = await comm.web3.eth.personal.unlockAccount(from, '111', 1)
   const r = await comm.contract.methods.onSale(0, 11).send({from: comm.root})
   console.log('onSale result:', r)
   process.exit()
})()