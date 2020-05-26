require('dotenv').config()
const testData = require('./test-data');

const submissionListener = require('../lambda/submission-created-broken').handler;


const body = {

        payload: testData
    }

const event = { body : JSON.stringify(body)}
submissionListener(event)