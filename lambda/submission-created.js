const superagent = require('superagent');

const API_URL = 'https://api.github.com/repos';
const REPO = 'townhallproject/frontline-stories';
const githubApi = {};

githubApi.get = (path) => {
    return superagent.get(`${API_URL}/${REPO}/${path}`)
        .set('User-Agent', 'townhallproject')
}

function convertToPost(formEntries, date) {
    const templateKey = formEntries.link ? 'embed-post' : 'blog-post';
    return {
        displayPage: 'story-wall',
        templateKey,
        name: formEntries.name,
        date,
        link: formEntries.link,
        occupation: formEntries.occupation,
        source: formEntries.source || '',
        tags: []

    }
}


 function getMasterSha() {
     return githubApi.get('git/refs/head')
         .then((response) => {
             const {
                 body
             } = response;
             const master = find(body, (ele) => ele.ref === 'refs/heads/master');
             return master.object.sha;
         })
 }

exports.handler = function (event, context, callback) {
    if (!event.body) {
        return callback('no body');
    }
    console.log(event.body)
    let payload;
    try {
        payload = JSON.parse(event.body).payload;
    } catch (error) {
        console.log(error)
        return callback(`error parsing JSON ${error}`);
    }
    const {
        data
    } = payload;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    const slugName = `${formattedDate}-${data.name.replace(' ', '-').toLowerCase()}`;
    const newBranchName = `cms/story-wall/${slugName}`;
    const dataToUpload = convertToPost(data, payload.created_at);
    return getMasterSha()
        .then(sha => {
            console.log('got sha', sha)
            const dataToSend = {
                ref: `refs/heads/${newBranchName}`,
                sha,
            }
            // return githubApi.post('git/refs', dataToSend)
        })
}
