(async function () {
    var comm = require('../../common')
    var contract = comm.contract
    const r = await contract.deploy({
        arguments: []
    }).send({from: comm.root})
    const addr = r._address
    console.log('new contract addr:', addr)

    await new Promise((resolve, reject) => {
        require('fs').writeFile(`${comm.artifactsDir}/CONTRACT_ADDR`, addr, (err, data) => {
            if(err){
                reject(err)
            }else {
                resolve(data)
            }
        })
    })
    process.exit()
})()

