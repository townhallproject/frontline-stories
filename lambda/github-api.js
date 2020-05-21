const request = require('superagent');

const API_URL = 'https://api.github.com/repos';
const REPO = 'townhallproject/frontline-stories'

const api = {}
console.log(process.env.GITHUB_TOKEN)
api.put = (path, data) => {
    return request.put(`${API_URL}/${REPO}/${path}`)
        .set('Authorization', `token ${process.env.GITHUB_TOKEN}`)
        .set('User-Agent', 'townhallproject')
        .send(data)
}

api.post = (path, data) => {
     return request.post(`${API_URL}/${REPO}/${path}`)
         .set('Authorization', `token ${process.env.GITHUB_TOKEN}`)
         .set('User-Agent', 'townhallproject')
         .send(data)
}

api.postFullUrl = (url, data) => {
    return request.post(url)
        .set('Authorization', `token ${process.env.GITHUB_TOKEN}`)
        .set('User-Agent', 'townhallproject')
        .send(data)
}
api.get = (path) => {
    return request.get(`${API_URL}/${REPO}/${path}`)
    .set('User-Agent', 'townhallproject')   
}

module.exports = api;