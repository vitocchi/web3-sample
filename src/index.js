const express = require('express')
const Web3 = require('web3')

const web3 = new Web3("http://localhost:8545")
const app = express()

app.get('/', (req, res) => {
    res.send('Hello this is ethereum exploler')
})

//get balance of ethereum account
app.get('/:accountId/balance', async (req, res) => {
    var balance = await web3.eth.getBalance(req.params.accountId)
    res.json({
        accountId: req.params.accountId,
        balance: balance,
    })
})

//get blockNum
app.get('/block_num', async (req, res) => {
    var blockNum = await web3.eth.getBlockNumber()
    res.json({
        blockNum
    })
})

//get transactions
app.get('/:accountId/transactions', async (req, res) => {
    const accountId = web3.utils.toChecksumAddress(req.params.accountId)
    const blockNum = await web3.eth.getBlockNumber()
    var transactions = {
        'in': [],
        'out': [],
    }
    for (var i = 1; i <= blockNum; i++) {
        const block = await web3.eth.getBlock(i)
        const block_transactions = block.transactions
        block_transactions.forEach(async (transaction_id) => {
            const transaction = await web3.eth.getTransaction(transaction_id)
            if (transaction.to === accountId) {
                transactions.in.push(transaction)
            }
            if (transaction.from === accountId) {
                transactions.out.push(transaction)
            }
        })
    }
    res.json({
        count: await web3.eth.getTransactionCount(accountId),
        transactions,
    })
})

app.listen(3001, () => {
    console.log('Listening on port!!')
    console.log('web3 provider')
    console.log(web3.currentProvider)
})