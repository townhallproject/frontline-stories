import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import imagesLoaded from 'imagesloaded';
import Post from './Post'
import './storywall.scss'
import { calcGridSize } from '../utils';
import {
  Waypoint
} from 'react-waypoint';

class StoryWall extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
    }
  }

  componentDidMount() {
    calcGridSize('.story-wall', '.story-wall .card-container');

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
    const handleEnter = (event, index) => {
      calcGridSize('.story-wall', '.story-wall .card-container');
      if (!this.state[index]) {

        this.setState({
          [index]: true
        })
      }
    }
      
    return (<div className="columns is-multiline story-wall grid-container">
        {posts &&
          posts.map(({ node: post }, index) => (
            <>
              <Post 
                post={post}
                key={post.fields.slug}
                load={this.state[index]}
              />
              <Waypoint
                  onEnter={(event) => handleEnter(event, index)}
                  id={index}
                  bottomOffset={'-700px'}

              />
            </>
          ))}
      </div>)
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
