(async function () {
  var comm = require('../../common')
  // console.log(comm.contract)
  var from = '0xbE6c47FEE054436222e317e3ff437C301376d237'
  var fromKey = '0x5996deeb37f6aacd8c663dd818c77b02845e0b9ebe35fd1c8c9b8d06594c1e5b'
  var to = '0x003Fd29FfeA87E1bAe7819eBA1c170D2C0B67ee5'
   var r = await comm.contract.methods.createTreasure(77, Math.floor(Date.now() / 1000) - 3600 )
  // var r = await comm.contract.methods.totalSupply()

  console.log('tranfer abi:', r.encodeABI(), 'addr:', r._parent._address)
  var r = await comm.eth.accounts.signTransaction({
    to: r._parent._address,
    data: r.encodeABI(),
    nonce: 110,
    gasPrice: comm.web3.utils.toWei('20', 'gwei'),
    gas: 21000,
  }, fromKey)
  console.log('serialized', r.rawTransaction)
  r = await comm.eth.sendSignedTransaction(r.rawTransaction)
  console.log('trans result', r)
  process.exit()
})()