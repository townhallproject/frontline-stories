import React from 'react'
import PropTypes from 'prop-types'

export const FacebookEmbed = ({ link, slug }) => {
  const formattedUrl = encodeURIComponent(link);

  const src = `https://www.facebook.com/plugins/post.php?href=${formattedUrl}`
  
  return (
    <div className={`${slug} facebook-post`}>
      <a href={link} target="_blank" without rel="noopener noreferrer"></a>
      <iframe 
        title={slug} 
        src={src} 
        width="100%" height="440" style={{border:'none', overflow:'hidden'}} scrolling="no" frameBorder="0" allowTransparency={true} allow="encrypted-media"></iframe>
    </div>
  
)}

FacebookEmbed.propTypes = {
  content: PropTypes.node,
  slug: PropTypes.string,
}

export default FacebookEmbed

