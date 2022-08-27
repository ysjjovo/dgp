(async function () {
   var comm = require('../../common')
   var from = '0x003Fd29FfeA87E1bAe7819eBA1c170D2C0B67ee5'
   var r = await comm.web3.eth.personal.unlockAccount(from, '111', 1)
   console.log('unlock result', r)
   r = await comm.contract.methods.buy(0).send({from: from, value: 10})
   console.log('onSale result:', r)
   process.exit()
})()
