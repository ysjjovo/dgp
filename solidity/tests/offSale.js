(async function () {
   var comm = require('../../common')
   const r = await comm.contract.methods.offSale().send()
   console.log('offSale result:', r)
   process.exit()
})()