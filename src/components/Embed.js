import React from 'react'
import PropTypes from 'prop-types'
import TwitterEmbed from './TwitterEmbed'
import FacebookEmbed from './FacebookEmbed'
import Content, {
  HTMLContent
} from '../components/Content'

export const Embed = ({link, slug, source, story}) => {
  switch(source) {
    case 'twitter': 
      return <TwitterEmbed link={link} slug={slug} />
    case 'facebook':
      return <FacebookEmbed link={link} slug={slug} />
    default: 
      return <HTMLContent
                content={story}
              />
  }
}

Embed.propTypes = {
  content: PropTypes.node,
  slug: PropTypes.string,
}

export default Embed
