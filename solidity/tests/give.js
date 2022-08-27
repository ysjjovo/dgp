(async function () {
   var comm = require('../../common')
   var to = '0x003Fd29FfeA87E1bAe7819eBA1c170D2C0B67ee5'
   await comm.contract.methods.transfer(to, 0).send({ from: comm.root })
   process.exit()
})()
