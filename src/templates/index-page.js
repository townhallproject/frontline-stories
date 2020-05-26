import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import StoryWall from '../components/StoryWall'
import {
  Link
} from 'gatsby';
import logo from '../img/logo.svg'
import '../components/main.scss';
import './index-page.scss'

export const IndexPageTemplate = ({
  image,
  heading,
  subtitle,
  description
}) => (
  <div>
    <div
      className="full-width-image margin-top-0 header"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div
       className="header-overlay"
      >
        <div className="content has-text-centered logo">
          <img
            src={logo}
            alt="Frontline stories"
            style={{filter: 'drop-shadow(2px 0px 6px black)' }}
          />
        </div>
     
      </div>
    </div>
    <section className="tell-story-container">
        <div
          className="is-size-5-mobile is-size-5-tablet is-size-4-widescreen subtitle"
      
        >
          {subtitle}
        </div>
        <div
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen subtitle"
      
        >
          {description}
        </div>
        <Link className="btn" to="/contact">
                Tell your story
        </Link>

    </section>
    <section className="section section--gradient main-container">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <div className="column is-12">
                <h3 className="has-text-weight-semibold is-size-2">
                  {heading}
                </h3>
          
                <StoryWall />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subtitle={frontmatter.subtitle}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subtitle
        description
      }
    }
  }
`
