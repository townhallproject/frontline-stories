import {
    filter,
    intersection,
    includes
} from 'lodash'

export const filterPosts = (posts, states, categories)  => {
    if (!states.length && !categories.length) {
        return posts;
    } else if (!states.length) {
        return filter(posts, ({ node: post }) => intersection(categories, post.frontmatter.tags).length
        )
    } else if (!categories.length) {
        return filter(posts, ({
            node: post
        }) => {
            console.log(post.frontmatter)
            return includes(states, post.frontmatter.state)
        }
        )
    } else {
        return filter(posts, ({
            node: post
        }) =>  includes(states, post.frontmatter.state) && intersection(categories, post.frontmatter.tags).length)
    }
}