import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare, faVolumeLow, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';

function FooterRight({ likes, comments, saves, shares, profilePic, videoRef }) {
  const [liked, setLiked]=useState(false);
  const [saved, setSaved]= useState(false);
  const [muted, setMuted] = useState(false); // Trạng thái âm thanh
  const [userAddIcon, setUserAddIcon]=useState(faCirclePlus);

  const handleUserAddClick = () =>{
    setUserAddIcon(faCircleCheck);
    setTimeout(()=>{
      setUserAddIcon(null);
    }, 3000);
  };

  const parseLikesCount = (count) =>{
    if(typeof count === 'string'){
      if(count.endsWith('K')){
        return parseFloat(count)*1000;
      }
      return parseInt(count);
    }
    return count;
  };

  const formatLikesCount = (count) => {
    if(count >= 1000){
      return (count/1000).toFixed(1)+'K';
    }
    return count;
  };

  const handleLikeClick = () =>{
    setLiked((prevLiked)=> !prevLiked);
  }

  const handleMuteClick = () => {
    if (videoRef && videoRef.current) {
      const isMuted = !videoRef.current.muted;
      videoRef.current.muted = isMuted; // Thay đổi trạng thái âm thanh của video
      setMuted(isMuted); // Cập nhật trạng thái `muted`
    }
  };

  return (
    <div className='footer-right'>
      <div className='sidebar-icon'>
        {/* the user profile picture */}
        {profilePic ? (
          // display user profile picture
          <img src = {profilePic} alt='Profile' className='userprofile' style={{width: '45px', height:'45px',color: '#616161'}} />
        ) : null}
        {/* user add icon */}
        <FontAwesomeIcon icon={userAddIcon} className='useradd' style={{width: '15px', height:'15px',color: '#FF0000'}} onClick={handleUserAddClick} />
      </div>

      <div className='sidebar-icon'>
        {/* like icon */}
        <FontAwesomeIcon icon={faHeart} style={{width: '35px', height:'35px',color: liked ? '#FF0000' : 'white'}} onClick={handleLikeClick} />

        {/* display the formatted likes count */}
        <p>{formatLikesCount(parseLikesCount(likes) +(liked ? 1 : 0))}</p>
      </div>

      <div className='sidebar-icon'>
        {/* the comment icon */}
        <FontAwesomeIcon icon={faCommentDots} style={{width: '35px', height:'35px',color: 'white'}} />

        {/* display the comments count */}
        <p>{comments}</p>
      </div>

      <div className='sidebar-icon'>
        {/* the save icon */}
        {saved ? (
          //display bookmark icon when saved
          <FontAwesomeIcon icon = {faBookmark} style={{width: '35px', height:'35px',color: '#ffc107'}} onClick={()=>setSaved(false)} />
        ) : (
          // display bookmark icon when not saved
          <FontAwesomeIcon icon = {faBookmark} style={{width: '35px', height:'35px',color: 'white'}} onClick={()=>setSaved(true)} />
        )}
        {/* display the number of saves */}
        <p>{saved ? saves + 1 : saves}</p>
      </div>

      <div className='sidebar-icon'>
        {/* the share icon */}
        <FontAwesomeIcon icon = {faShare} style={{width: '35px', height:'35px',color: 'white'}} />

        {/* display the number of shares */}
        <p>{shares}</p>
      </div>

      <div className='sidebar-icon mute'>
        {/* Icon thay đổi dựa trên trạng thái muted */}
        <FontAwesomeIcon
          icon={muted ? faVolumeMute : faVolumeLow}
          style={{ width: '35px', height: '35px', color: 'white' }}
          onClick={handleMuteClick}
        />
      </div>

      <div className='sidebar-icon record'>
        {/* the record icon */}
        <img src="https://static.thenounproject.com/png/934821-200.png" alt="Record icon" />
      </div>
      

    </div>
  );
}

export default FooterRight;
