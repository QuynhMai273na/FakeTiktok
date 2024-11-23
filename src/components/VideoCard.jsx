import React, { useRef, useEffect } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const {url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay}=props;
  const videoRef = useRef(null);

  useEffect(()=>{
    if(autoplay){
      videoRef.current.play();
    }
  }, [autoplay]);

  const onVideoPress = () =>{
    if(videoRef.current.paused){
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className='video'>
      <video
       className='player'
       onClick={onVideoPress}
       ref = { (ref)=>{
        videoRef.current = ref;
        setVideoRef(ref);
       }
       }
       loop
       src ={url}
       ></video>
       <div className='bottom-controls'>
        <div className='footer-left'>
          {/* the left part of container */}
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className='footer-right'>
          {/* the right part of container */}
          <FooterRight likes={likes} shares={shares} comments={comments} saves={saves} profilePic={profilePic} videoRef={videoRef}/>
        </div>
       </div>
    </div>
  );
};

export default VideoCard;
