(async function () {
   var comm = require('../../common')
   var r
   // var to = '0x003Fd29FfeA87E1bAe7819eBA1c170D2C0B67ee5'

   // r = await comm.web3.eth.personal.unlockAccount(to, '111', 1)
   // console.log('unlock result', r)
   // comm.contract.events.Error({
   //    fromBlock: 0
   // }, function (error, event) { console.log("event?", event, comm.web3.utils.hexToAscii(event.returnValues.e)); })
      // .on("connected", function (subscriptionId) {
      //    console.log("connected?", subscriptionId);
      // })
      // .on('data', function (event) {
      //    console.log("what data?", event); // same results as the optional callback above
      // })
      // .on('changed', function (event) {

      //    console.log("changed?", event);
      // })
      // .on('error', function (error, receipt) {
      //    console.log("error???", event); // same results as the optional callback above
      // })
   r = await comm.contract.methods.createTreasure(77, Math.floor(Date.now() / 1000) - 3600).send({ from: comm.root })
   console.log('create result:', r)
   process.exit()
})()