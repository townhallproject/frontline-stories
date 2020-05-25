import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'

import GridView from '../components/GridView';

class StatesRoute extends React.Component {

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
                <p>
                  <Link to="/states/">Browse all states</Link>
                </p>
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
