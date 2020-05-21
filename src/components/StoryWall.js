import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Colcade from 'colcade';
import Post from './Post'
import './storywall.scss'
import { calcGridSize } from '../utils';


class StoryWall extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
    }
  }

  componentDidMount() {

    
    calcGridSize('.story-wall', '.story-wall .card-container');

    window.addEventListener("resize", function () {
      calcGridSize('.story-wall', '.story-wall .card-container');
    })
  }


  handleMount = (id) => {
    const {
      data
    } = this.props;

    const {
      edges: posts
    } = data.allMarkdownRemark;

    if (id === posts.length -1 ) {
      var grid = document.querySelector('.story-wall');

      this.colc = new Colcade(grid, {
        columns: '.grid-col',
        items: '.card-container'
      });
    }
  }

  onSize = (size, id) => {
    // console.log('changed hight',  size.height, id)
    calcGridSize('.story-wall', '.story-wall .card-container');
  }

  handleEnter = (event, id) => {
    // calcGridSize('.story-wall', '.story-wall .card-container');
    if (!this.state[id]) {

      this.setState({
        [id]: true
      })
    }
  }
    

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    return (<div className="columns is-multiline story-wall grid-container">
        <div className="grid-col grid-col--1"></div>
        <div className="grid-col grid-col--2"></div>
        <div className="grid-col grid-col--3"></div>
        <div className="grid-col grid-col--4"></div>
        {posts &&
          posts.map(({ node: post }, index) => (
            <>
              <Post 
                post={post}
                key={post.fields.slug}
                load={this.state[post.id]}
                handleMount={this.handleMount}
                onSize={(size) => this.onSize(size, post.id)}
                index={index}
                handleEnter={(event) => this.handleEnter(event, post.id)}
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
      sort: {
        order: [ASC, DESC],
        fields: [frontmatter___featuredpost, frontmatter___date]
      }

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
