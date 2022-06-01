(async function () {
    var comm = require('../../common')
    eth = comm.eth
    root = comm.root
    console.log(await eth.getBalance(root))
    console.log(await eth.getGasPrice())
    console.log(await eth.getBlock('latest'))
    process.exit()
})()

