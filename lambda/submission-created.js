// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
module.exports.handler = async function (event, context, callback) {
    const {
        payload
    } = JSON.parse(event.body)
    console.log(payload)
}

