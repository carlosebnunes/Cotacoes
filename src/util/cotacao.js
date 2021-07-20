const request = require('request')

const api_token = 'bc6b061516e6714fed41388e078d2239'

const cotacao = (symbol, callback) => {

    const url = `http://api.marketstack.com/v1/eod?access_key=${api_token}&symbols=${symbol}`

    request({url: url, json: true}, (err, response) =>{
        if(err){
            callback({
                message: `Something went wrong: ${err}`,
                code:500
            }, undefined)
        }

        if(response.body === undefined || response.body.data === undefined){
            callback({
                message: `No data found`,
                code:404
            }, undefined)
        }

        const parsedJSON = response.body.data[0]

        const {symbol, open, close, date, volume} = parsedJSON

        return callback(undefined, {symbol, open, close, date, volume})
    })
}

module.exports = cotacao