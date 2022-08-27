(async function () {
    var comm = require('../../common')
    eth = comm.eth
    root = comm.root
    console.log('balance', await eth.getBalance(root))
    console.log('gasPrice', await eth.getGasPrice())
    console.log('latest block', await eth.getBlock('latest'))
    process.exit()
})()

