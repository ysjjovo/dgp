(async function () {
    var net = require('net')
    var Web3 = require('web3')
    var web3 = new Web3('/home/lin/eth/data/geth.ipc', net)
    var to = '0x003Fd29FfeA87E1bAe7819eBA1c170D2C0B67ee5'
    var toKey = '1bf7e3f22560c8710e768d937fbfb11a2d830ce35ef39a74270eee91c993608e'
    var from = '0xbE6c47FEE054436222e317e3ff437C301376d237'
    var fromKey = '0x5996deeb37f6aacd8c663dd818c77b02845e0b9ebe35fd1c8c9b8d06594c1e5b'
    var password = '111'
    var r = await web3.eth.personal.importRawKey(toKey, password)

    // var r =  await web3.eth.getAccounts()
    // console.log('accounts:', r)
    //     .then(console.log);
    // var r = await web3.eth.accounts.sendTransaction({
    //     from: 
    //     to: from,
    //     nonce: "0",
    //     value: web3.utils.toWei('1', 'ether'),
    //     gasPrice: web3.utils.toWei('20', 'gwei'),
    //     gas: 21000,
    // }, toKey)

    process.exit(0)
})()