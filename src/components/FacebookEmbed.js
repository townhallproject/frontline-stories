import React from 'react'
import PropTypes from 'prop-types'

export const FacebookEmbed = ({ link, slug }) => {
  const formattedUrl = encodeURIComponent(link);

  const src = `https://www.facebook.com/plugins/post.php?href=${formattedUrl}&width=500`
  
  return (
    <div className={slug}>
      <iframe title={slug} src={src} width="500" height="683" style={{border:'none', overflow:'hidden'}} scrolling="no" frameBorder="0" allowTransparency={true} allow="encrypted-media"></iframe>
    </div>
  
)}

FacebookEmbed.propTypes = {
  content: PropTypes.node,
  slug: PropTypes.string,
}

export default FacebookEmbed

