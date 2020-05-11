import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Post from './Post'
import './blogroll.scss'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <Post 
              post={post}
              key={post.fields.slug}
            />
          ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
  query={graphql`
  query FeaturedPostQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          featuredpost: {
            eq: true
          }
        }
      }
        ) {
          edges {
            node {
              id
              html
              fields {
                slug
              }
              frontmatter {
                name
                link
                source
                templateKey
                displayPage
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                tags
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
