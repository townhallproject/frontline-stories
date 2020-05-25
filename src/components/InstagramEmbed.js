import React from 'react'
import PropTypes from 'prop-types'
import InstagramEmbed from 'react-instagram-embed';


export const TwitterEmbed = ({ link, slug }) => {
    return (
    <div className={slug}>
      <InstagramEmbed
        url={link}
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
    </div>
  
)}

TwitterEmbed.propTypes = {
  content: PropTypes.node,
  slug: PropTypes.string,
}

export default TwitterEmbed
