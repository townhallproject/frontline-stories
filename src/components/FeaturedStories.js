import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Post from './Post'
import imagesLoaded from 'imagesloaded';
import { calcGridSize } from '../utils';

class FeaturedStories extends React.Component {

  componentDidMount() {
    calcGridSize('.featured-stories', '.featured-stories .card-container');

    window.addEventListener("resize", function () {
      // Check if all the images finished loading
      imagesLoaded(document.querySelector('.grid-container'), function () {
        calcGridSize('.featured-stories', '.featured-stories .card-container');
      });
    })
  
  }

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    return (
      <div className="columns is-multiline grid-container featured-stories">
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

FeaturedStories.propTypes = {
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
    render={(data, count) => <FeaturedStories data={data} count={count} />}
  />
)