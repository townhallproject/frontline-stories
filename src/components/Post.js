import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import TwitterEmbed from './TwitterEmbed'

class Post extends React.Component {
  render() {
    const { post } = this.props;
    return (
            <div className="is-parent column is-6" key={post.id}>
              <article
                className={`blog-list-item tile is-child box notification ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <header>
                  {post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null}
                  <div className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.name}
                    </Link>
                    <span className="subtitle is-size-5 is-block">
                      {post.frontmatter.source === 'twitter' ? 
                      
                    <TwitterEmbed
                        link={post.frontmatter.link}
                    />: <div>{post.frontmatter.story}</div>}
                     
                    </span>
                  </div>
                </header>
         
              </article>
            </div>
        
    )
  }
}

Post.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default Post;
