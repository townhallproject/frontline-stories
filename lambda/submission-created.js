// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
const find = require('lodash');
const map = require('lodash');
const leftPad = require("left-pad");

const superagent = require('superagent');

const API_URL = 'https://api.github.com/repos';
const REPO = 'townhallproject/frontline-stories';


function newLineAndIndent(markdownString, depth) {
    if (depth === 0) {
        return `${markdownString}\n`;
    }

    return `${markdownString}\n${leftPad('', depth*2)}`;
}

function transformMarkdownKeyValueToString(
    key,
    value,
    markdownString,
    depth = 0
) {
    try {
        if (typeof value === "object") {
            if (value instanceof Array) {
                const arrayString = `${value.map(item => `"${item}"`)}`;
                return `${newLineAndIndent(
          markdownString,
          depth
        )}${key}: [${arrayString}]`;
            } else if (value instanceof Error) {
                return markdownString;
            } else {
                return Object.entries(value).reduce(
                    (accString, [entryKey, entryValue]) => {
                        return `${transformMarkdownKeyValueToString(
              entryKey,
              entryValue,
              accString,
              depth + 1
            )}`;
                    },
                    `${newLineAndIndent(markdownString, depth)}${key}:`
                );
            }
        } else {
            return `${newLineAndIndent(markdownString, depth)}${key}: ${value}`;
        }
    } catch (err) {
        return `${newLineAndIndent(markdownString, depth)}${key}: ${JSON.stringify(
      value
    )}`;
    }
}

function convertToMarkdown(frontmatterMarkdown) {
    let markdownString = `---`;
    frontmatterMarkdown.frontmatter.forEach(frontmatterField =>
        Object.entries(frontmatterField).forEach(([key, value]) => {
            markdownString = transformMarkdownKeyValueToString(
                key,
                value,
                markdownString
            );
        })
    );

    markdownString = `${markdownString}\n---`;
    try {
        markdownString = `${markdownString}\n${frontmatterMarkdown.body}`;
    } catch (e) {
        markdownString = `${markdownString}\n${JSON.stringify(
      frontmatterMarkdown.body
    )}`;
    }
    // TODO implement the transform
    return markdownString;
}

const githubApi = {};
githubApi.put = (path, data) => {
    return superagent.put(`${API_URL}/${REPO}/${path}`)
        .set('Authorization', `token ${process.env.GITHUB_TOKEN}`)
        .set('User-Agent', 'townhallproject')
        .send(data)
}

githubApi.post = (path, data) => {
    return superagent.post(`${API_URL}/${REPO}/${path}`)
        .set('Authorization', `token ${process.env.GITHUB_TOKEN}`)
        .set('User-Agent', 'townhallproject')
        .send(data)
}

githubApi.postFullUrl = (url, data) => {
    return superagent.post(url)
        .set('Authorization', `token ${process.env.GITHUB_TOKEN}`)
        .set('User-Agent', 'townhallproject')
        .send(data)
}
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
        source: formEntries.source,
        tags: []

    }
}
 function getMasterSha() {
    return githubApi.get('git/refs/head')
        .then((response) => {
            const { body } = response;
            const master = find(body, (ele) => ele.ref === 'refs/heads/master');
            return master.object.sha;
        })
 }

exports.handler = function handler(event, context, callback) {
    console.log(event)
    if (!event.body) {
        
        return callback('no body')
    }
    let payload;    
    try {
        payload = JSON.parse(event.body).payload;
    } catch (error) {
        return callback(`error parsing JSON ${error}`)
    }
    const { data } = payload;
    const slugName = `${Date.now()}-${data.name.replace(' ', '-').toLowerCase()}`;
    const newBranchName = `cms/story-wall/${slugName}`;
    const dataToUpload = convertToPost(data, payload.created_at);
    getMasterSha()
        .then(sha => {
            console.log('got sha', sha)
            const dataToSend = {
                ref: `refs/heads/${newBranchName}`,
                sha,
            }
            return githubApi.post('git/refs', dataToSend)
        })
        .then((returned) => {
            const convertedData = map(dataToUpload, (value, key) => ({[key]: value}))
            const fileContent = convertToMarkdown({
                frontmatter: convertedData,
                body: data.story
            })
            const base64Content = Buffer.from(fileContent).toString('base64')
            console.log('fileContent', fileContent)
            const dataToSend = {
                message: 'Automatically generated by Netlify Form',
                branch: newBranchName,
                content: base64Content
            }
            return githubApi.put(`contents/src/pages/story-wall/${slugName}.md`, dataToSend)
        })
        .then(() => {
            const dataToSend = {
                title: `Update Social Media Embed Post "${slugName}"`,
                head: newBranchName,
                base: 'master'
            }
            return githubApi.post('pulls', dataToSend)
        })
        .then(returned => {
            console.log(returned.body.issue_url)
            const ref = returned.body.issue_url;
            return githubApi.postFullUrl(`${ref}/labels`, {
                labels: ['netlify-cms/draft']
            })
        })
        .catch(console.log)
}
