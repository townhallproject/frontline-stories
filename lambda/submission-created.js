exports.handler = function (event, context, callback) {
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
    const {
        data
    } = payload;
    const slugName = `${Date.now()}-${data.name.replace(' ', '-').toLowerCase()}`;
    const newBranchName = `cms/story-wall/${slugName}`;
    console.log(slugName, newBranchName, data)
}
