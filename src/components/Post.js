import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Embed from './Embed'

class Post extends React.Component {
  render() {
    const { post } = this.props;
    return (
            <div className="is-parent column is-6" key={post.id}>
              <article
                className={`blog-list-item tile is-child box ${
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
                      <Embed 
                          link={post.frontmatter.link}
                          source={post.frontmatter.source}
                          story={post.html}
                          slug={post.fields.slug}
                      />
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
