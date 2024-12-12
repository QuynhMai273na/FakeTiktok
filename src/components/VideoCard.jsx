import React, { useRef, useEffect } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay, videoId } = props;
  const videoRef = useRef(null);

  // Handle autoplay when the video should start playing automatically
  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play();
    }
  }, [autoplay]);

  // Handle video play/pause on click
  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className="video">
      {/* Video element */}
      <video
        className="player"
        onClick={onVideoPress} // Toggle play/pause on click
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref); // Passing ref back to parent component for controls
        }}
        loop
        src={url}
        preload="auto" // Preload video for smoother experience
      ></video>
      
      {/* Controls section (Footer) */}
      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          {/* Pass necessary props to FooterRight, including the video URL and ID */}
          <FooterRight
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
            videoRef={videoRef} // Video ref to manage mute, play, pause, etc.
            videoId={videoId} // videoId to generate dynamic video URLs in FooterRight
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
