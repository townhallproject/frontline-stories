import React from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube';


const _onReady = (event) => {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
}

export const YouTubeEmbed = ({ link, slug }) => {
    const id = link.split('?v=')[1];
    if (!id) return null;
    const opts = {
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      }
    }

 
    return (
      <div className={slug}>
        <YouTube videoId={id} opts={opts} onReady={_onReady} />
      </div>
      );
  }
 

YouTubeEmbed.propTypes = {
  content: PropTypes.node,
  slug: PropTypes.string,
}

export default YouTubeEmbed
