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

exports.handler = function (event, context, callback) {
    if (!event.body) {
        return callback('no body');
    }
    console.log(event.body)
    let payload;
    try {
        payload = JSON.parse(event.body).payload;
    } catch (error) {
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
    console.log(slugName, dataToUpload);

}
