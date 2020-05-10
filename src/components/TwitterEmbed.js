import React from 'react'
import PropTypes from 'prop-types'
import {
 
    TwitterTweetEmbed,

} from 'react-twitter-embed';

export const TwitterEmbed = ({ link, slug }) => {
    const id = link.split('/')[link.split('/').length - 1];
    console.log(id)
    if (!id) return null;
    return (
    <div className={slug}>
            <TwitterTweetEmbed
            tweetId={id}
            />
    </div>
  
)}

TwitterEmbed.propTypes = {
  content: PropTypes.node,
  slug: PropTypes.string,
}

export default TwitterEmbed
