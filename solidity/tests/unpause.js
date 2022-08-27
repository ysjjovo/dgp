(async function () {
   var comm = require('../../common')
   const r = await comm.contract.methods.unpause().send({from: comm.root})
   console.log('unpause result:', r)
   process.exit()
})()