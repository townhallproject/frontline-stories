import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import Embed from '../components/Embed'

export const EmbedPostTemplate = ({
  tags,
  name,
  helmet,
  post
}) => {
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            {name && <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {name}
            </h1>}
                <Embed 
                  link={post.frontmatter.link}
                  source={post.frontmatter.source}
                  story={post.frontmatter.story}
                  slug={post.fields.slug}
                />            
              {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                    <li key={tags + `tag`}>
                      <Link to={`/tags/${kebabCase(tags)}/`}>{tags}</Link>
                    </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

EmbedPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const EmbedPost = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <EmbedPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        name={post.frontmatter.hideName ? '' : post.frontmatter.name }
        post={post}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.name}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.name}
      />
    </Layout>
  )
}

EmbedPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default EmbedPost

export const pageQuery = graphql`
  query EmbedPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        name
        link
        occupation
        hideName
        source
        tags
      }
    }
  }
`
