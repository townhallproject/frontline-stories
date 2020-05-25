import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Colcade from 'colcade';

import Layout from '../components/Layout'
import Post from '../components/Post'
import {
  calcGridSize
} from '../utils';
import GridView from '../components/GridView';

class StatesRoute extends React.Component {
  handleMount = (id) => {
    const {
      data
    } = this.props;

    const {
      edges: posts
    } = data.allMarkdownRemark;

    if (id === posts.length - 1) {
      var grid = document.querySelector('.story-wall');

      this.colc = new Colcade(grid, {
        columns: '.grid-col',
        items: '.card-container'
      });
    }
  }
  onSize = (size, id) => {
    calcGridSize('.story-wall', '.story-wall .card-container');
  }

  handleEnter = (event, id) => {
    if (!this.state[id]) {

      this.setState({
        [id]: true
      })
    }
  }
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const state = this.props.pageContext.state
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const stateHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } in ${state}`

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${state} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: '6rem' }}
              >
                <h3 className="title is-size-4 is-bold-light">{stateHeader}</h3>
                <GridView posts={posts} />
                  <Link to="/states/">Browse all states</Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default StatesRoute

export const statesPageQuery = graphql`
  query StatePage($state: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { state: { eq: $state} } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            name
            source
            link
            tags
            state
          }
        }
      }
    }
  }
`
