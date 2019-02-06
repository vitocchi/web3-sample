const express = require('express')
const Web3 = require('web3')

const web3 = new Web3("http://localhost:8545")
const app = express()

app.get('/', (req, res) => {
    res.send('Hello this is ethereum exploler')
})

//get balance of ethereum account
app.get('/:accountId/balance', async (req, res) => {
    console.log(req.params.accountId)
    var balance = await web3.eth.getBalance(req.params.accountId)
    res.send(balance)
})

app.listen(3001, () => {
    console.log('Listening on port!!')
    console.log('web3 provider')
    console.log(web3.currentProvider)
})
