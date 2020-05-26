import { put, post, get } from 'superagent';

const API_URL = 'https://api.github.com/repos';
const REPO = 'townhallproject/frontline-stories';

const api = {}
api.put = (path, data) => {
    return put(`${API_URL}/${REPO}/${path}`)
        .set('Authorization', `token ${process.env.GITHUB_TOKEN}`)
        .set('User-Agent', 'townhallproject')
        .send(data)
}

api.post = (path, data) => {
     return post(`${API_URL}/${REPO}/${path}`)
         .set('Authorization', `token ${process.env.GITHUB_TOKEN}`)
         .set('User-Agent', 'townhallproject')
         .send(data)
}

api.postFullUrl = (url, data) => {
    return post(url)
        .set('Authorization', `token ${process.env.GITHUB_TOKEN}`)
        .set('User-Agent', 'townhallproject')
        .send(data)
}
api.get = (path) => {
    return get(`${API_URL}/${REPO}/${path}`)
    .set('User-Agent', 'townhallproject')   
}

export default api;