import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import imagesLoaded from 'imagesloaded';
import Post from './Post'
import './blogroll.scss'

class BlogRoll extends React.Component {
  static calcGridSize = () => {

    /**
     * Calculate the masonry
     *
     * Calculate the average of heights of masonry-bricks and then
     * set it as the height of the masonry element.
     *
     * @since 12212018
     * @author Rahul Arora
     * @param grid       Object  The Masonry Element 
     * @param gridCell   Object  The Masonry bricks
     * @param gridGutter Integer The Vertical Space between bricks 
     * @param bigGridCol   Integer Number of columns on big screens
     * @param medGridCol   Integer Number of columns on medium-sized screens
     * @param sGridCol   Integer Number of columns on small screens
     */
      const bigGridCol = 3;
      const medGridCol = 2;
      const sGridCol = 1;
      const gridGutter = 16;
      var g = document.querySelector('.story-wall'),
        gc = document.querySelectorAll('.card-container'),
        gcLength = gc.length, // Total number of cells in the masonry
        gHeight = 0, // Initial height of our masonry
        i; // Loop counter
  
      // Calculate the net height of all the cells in the masonry
      for (i = 0; i < gcLength; ++i) {
        gHeight += gc[i].offsetHeight + parseInt(gridGutter);
      }
  
      /*
       * Calculate and set the masonry height based on the columns
       * provided for big, medium, and small screen devices.
       */
      if (window.screen.width >= 1024) {
        //large
        g.style.height = gHeight / bigGridCol + gHeight / (gcLength + 1) + "px";
      } else if (window.screen.width < 1024 && window.screen.width >= 768) {
        g.style.height = gHeight / medGridCol + gHeight / (gcLength + 1) + "px";
      } else {
        g.style.height = gHeight / sGridCol + gHeight / (gcLength + 1) + "px";
      }
  }
  componentDidMount() {
    BlogRoll.calcGridSize();
    /**
     * Reform the masonry
     *
     * Rebuild the masonry grid on every resize and load event after making sure 
     * all the images in the grid are completely loaded.
     */
    ["resize", "load"].forEach(function (event) {
          // Follow below steps every time the window is loaded or resized
          window.addEventListener(event, function () {
            // Check if all the images finished loading
            imagesLoaded(document.querySelector('.story-wall'), function () {
              /*
               * A maonsry grid with 8px gutter, with 3 columns on desktop,
               * 2 on tablet, and 1 column on mobile devices.
               */
              BlogRoll.calcGridSize();
            });
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
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
