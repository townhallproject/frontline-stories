import React from 'react'
import PropTypes from 'prop-types'
import {
 
    TwitterTweetEmbed,

} from 'react-twitter-embed';

export const TwitterEmbed = ({ link, slug }) => {
    let cleanLink = link.split('?')[0];
    const id = cleanLink.split('/')[cleanLink.split('/').length - 1];
    if (!id) return null;
    return (
    <div className={slug}>
            <TwitterTweetEmbed
              tweetId={id}
              options={{width: 500}}

            />
    </div>
  
)}

TwitterEmbed.propTypes = {
  content: PropTypes.node,
  slug: PropTypes.string,
}

export default TwitterEmbed
