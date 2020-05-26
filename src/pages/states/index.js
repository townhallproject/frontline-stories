import React from 'react'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const StatesPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  return (
  <Layout>
    <section className="section">
      <Helmet title={`States | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="title is-size-2 is-bold-light">States</h1>
            <ul className="taglist">
              {group.map(state => {
                return (
                <li key={state.fieldValue}>
                  <Link to={`/states/${kebabCase(state.fieldValue)}/`}>
                    {state.fieldValue} ({state.totalCount})
                  </Link>
                </li>
              )}
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)}

export default StatesPage

export const tagPageQuery = graphql`
  query StatesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___state) {
        fieldValue
        totalCount
      }
    }
  }
`
