import React from 'react'
import ReactPlayer from 'react-player'

import './StyleSheets/VideoPlayer.css';


const VideoPlayer = ({src, isLoading}) => {
  return (

    <div className="player-wrapper shadow-secondary ">

        <ReactPlayer 
            className='react-player'
            url={src}
            controls={true}
            width='100%'
            height='100%'
        />
    </div>


  )
}

export default VideoPlayer