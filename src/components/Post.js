import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import sizeMe from 'react-sizeme'
import {
  Waypoint
} from 'react-waypoint';
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Embed from './Embed'

import './post.scss';

class Post extends React.Component {
  componentDidMount() {
    const {
      index,
      handleMount
    } = this.props;

    handleMount(index)
  }
  render() {

    const {
      post,
      load,
      handleEnter,
    } = this.props;
    return (
            <div className="is-parent card-container" key={post.id}>
              <Waypoint
                onEnter={handleEnter}
                id={post.id}
                bottomOffset={'-700px'}

              />
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
                    {load && <Embed 
                          link={post.frontmatter.link}
                          source={post.frontmatter.source}
                          story={post.html}
                          slug={post.fields.slug}
                      />}
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

export default sizeMe({
  monitorHeight: true
})(Post)
