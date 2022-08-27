const express = require('express')
const comm = require('./common')
const app = express()
const port = 3000
const web3 = comm.web3
app.use(express.json())
app.use(function (req, res, next) {
  res['ok'] = data => res.json({ code: 0, data })
  next()
})
app.get('/newAccount', async (req, res) => {
  const address = await web3.eth.personal.newAccount(req.query.password)
  res.ok(address)
})

app.get('/unpauseContract', async (req, res) => {
  await comm.contract.methods.unpause().send({from: comm.root})
  res.ok()
})
app.post('/createTreasure', async (req, res) => {
  r = await comm.contract.methods.createTreasure(req.body.nature, req.body.createAt).send({ from: comm.root })
  console.log('r', r)
  res.ok()
})

app.post('/transTreasure', async (req, res) => {
  await comm.web3.eth.personal.unlockAccount(req.body.from, req.body.password, 1)
  r = await comm.contract.methods.transfer(req.body.to, req.body.tokenId).send({ from: req.body.from })
  console.log('r', r)
  res.ok()
})
app.get('/', (req, res) => {
  res.send('This is decentralized game platform API.')
})
app.use(function(err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
})
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

