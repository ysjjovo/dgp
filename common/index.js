var rfs = require('fs').readFileSync
var artifactsDir = process.env.PROJECT_DIR + '/solidity/artifacts'
var net = require('net')
var root = process.env.ROOT_ADDR
var Web3 = require('web3')
var web3 = new Web3(process.env.IPC_PATH, net)
var eth = web3.eth
var bin = rfs(`${artifactsDir}/${process.env.CONTRACT}.bin`, 'utf-8')
var abi = JSON.parse(rfs(`${artifactsDir}/${process.env.CONTRACT}.abi`, 'utf-8'))
var contractAddr = rfs(`${artifactsDir}/CONTRACT_ADDR`).toString()
console.log("contract addr:", contractAddr)

var contract = new eth.Contract(abi, contractAddr, {
    // from: root,
    gasPrice: web3.utils.toWei('20', 'gwei'),
    gasLimit: 21000000,
    data: bin,
})

contract.events.Error({
    fromBlock: 0
}, function (error, event) { 
    if(err) {
        console.log("got err:", err)
        if(event){
            console.log("returnValues:", web3.utils.hexToAscii(event.returnValues.e))
        }
    }
})

module.exports = {
    artifactsDir: artifactsDir,
    root: root,
    web3,
    eth,
    contract: contract
}