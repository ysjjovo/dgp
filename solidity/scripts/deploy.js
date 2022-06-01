(async function () {
    var comm = require('../../common')
    eth = comm.eth
    root = comm.root
    var contract = new eth.Contract(comm.abi)
    const r = await contract.deploy({data: comm.bin}).send({
        from: root,
        gasPrice: 20000000000,
    })
    console.log(r)
    process.exit()
})()

