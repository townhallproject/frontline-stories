import React from 'react'
import PropTypes from 'prop-types'
import TwitterEmbed from './TwitterEmbed'
import FacebookEmbed from './FacebookEmbed'

export const Embed = ({link, slug, source, story}) => {
  switch(source) {
    case 'twitter': 
      return <TwitterEmbed link={link} slug={slug} />
    case 'facebook':
      return <FacebookEmbed link={link} slug={slug} />
    default: 
      return <div>{story}</div>
  }

}

Embed.propTypes = {
  content: PropTypes.node,
  slug: PropTypes.string,
}

export default Embed
