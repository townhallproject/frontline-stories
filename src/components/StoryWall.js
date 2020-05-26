import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import GridView from './GridView'
import './storywall.scss'
import StateFilter from './Filters/Filter';
import {filterPosts} from './Filters/selectors';

class StoryWall extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      states: [],
      tags: []
    }
  }

  handleFilterChange = (values, key) => {
    this.setState({[key] : values})
  }
    

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { states } = data.allMarkdownRemark;
    const {
      tags
    } = data.allMarkdownRemark;
    const filteredPosts = filterPosts(posts, this.state.states, this.state.tags)
    return (
      <>
      <div className="filter-bar">
        <StateFilter options={states} placeholder="Filter by state" onChange={(values) => this.handleFilterChange(values, 'states')}
        /> 
        <StateFilter options={tags} placeholder="Filter by category" onChange={(values) => this.handleFilterChange(values, 'tags')}
        /> 

      </div>

        <GridView posts={filteredPosts} />
      </>
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
          states: group(field: frontmatter___state) {
            fieldValue
            totalCount
          }
          tags: group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
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
                state
                occupation
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
