import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { Helmet } from 'react-helmet'
import ScriptTag from 'react-script-tag';

// import widget from '../utils/record-widget';
// console.log(widget)
export const RecordStoryPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
              {/* <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2> */}
              {/* <PageContent className="content" content={content} /> */}
              <ScriptTag
                  id="countable-social-video-script"
                  src="https://www.countable.us/widgets/social-video/plugin.js"
                  data-partner-id="41d4052e-67f4-46a3-b995-db92ff20aefe"
                  data-only-featured="true"
                  data-auto-campaign="true"
                  data-video-sharing="true"
                  data-video-share-title="SHARE YOUR STORY"
                  data-video-share-body="Has the coronavirus crisis personally affected you or someone you know? It's now easier than ever for you to take action and make your voice heard. Just click below and record your video."
                  data-video-share-url=""
                  data-user-mode="lead_with_zip"
                  data-video-context=""
                  data-title="SHARE YOUR STORY"
                  data-subtitle="Your story will help inspire others"
                  data-body="Has the coronavirus crisis personally affected you or someone you know? It's now easier than ever for you to take action and make your voice heard. Just click below and record your video."
                  data-cta="Record Your Video"
                  data-cta-background-color="#0a3184"
                  data-cta-text-color="#ffffff"
                  data-width="100%"
                  data-height="500px"
                  type="text/javascript" async>
              </ScriptTag>
            </div>
        </div>
        <Link className="navbar-item column is-10 is-offset-4" to="/contact">
          Or submit your story on social media
        </Link> 
      </div>
    </section>
  )
}

RecordStoryPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const RecordStoryPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <RecordStoryPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

RecordStoryPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default RecordStoryPage

export const recordStoryPageQuery = graphql`
  query RecordStoryPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
