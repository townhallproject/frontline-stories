import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import imagesLoaded from 'imagesloaded';
import Post from './Post'
import './storywall.scss'
import { calcGridSize } from '../utils';

class StoryWall extends React.Component {

  componentDidMount() {
    calcGridSize('.story-wall', '.story-wall .card-container');
    setTimeout(() => calcGridSize('.story-wall', '.story-wall .card-container'), 3000);
    setTimeout(() => calcGridSize('.story-wall', '.story-wall .card-container'), 4000);

    window.addEventListener("resize", function () {
      // Check if all the images finished loading
      imagesLoaded(document.querySelector('.grid-container'), function () {
        calcGridSize('.story-wall', '.story-wall .card-container');
      });
    })
  }

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    return (
      <div className="columns is-multiline story-wall grid-container">
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

StoryWall.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
  query={graphql`
  query BlogRollQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          displayPage: {
            eq: "story-wall"
          }
          featuredpost: {
            ne: true
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
    render={(data, count) => <StoryWall data={data} count={count} />}
  />
)
