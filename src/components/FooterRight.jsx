import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare, faVolumeLow, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';
import { faFacebook, faInstagram, faThreads } from '@fortawesome/free-brands-svg-icons';

function FooterRight({ likes, comments, saves, shares, profilePic, videoRef, videoId }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [muted, setMuted] = useState(false); // Trạng thái âm thanh
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);

  // Hàm xử lý khi người dùng click vào biểu tượng thêm bạn
  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(faCirclePlus); // Đổi lại biểu tượng sau 3 giây
    }, 3000);
  };

  // Hàm chuyển đổi giá trị số lượng likes
  const parseLikesCount = (count) => {
    if (typeof count === 'string') {
      if (count.endsWith('K')) {
        return parseFloat(count) * 1000; // Chuyển K thành số
      }
      return parseInt(count);
    }
    return count;
  };

  // Hàm hiển thị likes dưới dạng có "K" nếu số lượng lớn
  const formatLikesCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'; // Chuyển đổi thành dạng "1.2K"
    }
    return count;
  };

  // Hàm xử lý khi click vào nút like
  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked); // Đảo ngược trạng thái like
  };

  // Hàm xử lý khi click vào nút tắt/mở âm thanh
  const handleMuteClick = () => {
    if (videoRef && videoRef.current) {
      const isMuted = !videoRef.current.muted;
      videoRef.current.muted = isMuted; // Thay đổi trạng thái âm thanh của video
      setMuted(isMuted); // Cập nhật trạng thái muted
    }
  };

  // Popup chia sẻ video
  const [isSharePopupVisible, setSharePopupVisible] = useState(false);

  const handleShareClick = () => {
    setSharePopupVisible(true); // Hiển thị popup chia sẻ
  };

  const handleClosePopup = () => {
    setSharePopupVisible(false); // Đóng popup chia sẻ
  };

  // Hàm sao chép URL video vào clipboard
  const handleSaveClick = () => {
    const videoUrl = `http://localhost:3000/videos/video${videoId}`; // Sử dụng videoId để tạo URL động
    navigator.clipboard.writeText(videoUrl).then(() => {
      alert('Video URL copied to clipboard!'); // Thông báo đã sao chép thành công
    }).catch((err) => {
      console.error('Failed to copy: ', err); // Nếu có lỗi trong việc sao chép URL
    });
  };

  return (
    <div className="footer-right">
      <div className="sidebar-icon">
        {/* Hình ảnh người dùng */}
        {profilePic ? (
          <img src={profilePic} alt="Profile" className="userprofile" style={{ width: '45px', height: '45px', color: '#616161' }} />
        ) : null}
        {/* Biểu tượng thêm bạn */}
        <FontAwesomeIcon icon={userAddIcon} className="useradd" style={{ width: '15px', height: '15px', color: '#FF0000' }} onClick={handleUserAddClick} />
      </div>

      <div className="sidebar-icon">
        {/* Biểu tượng thích (like) */}
        <FontAwesomeIcon icon={faHeart} style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }} onClick={handleLikeClick} />
        {/* Hiển thị số lượng likes */}
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>

      <div className="sidebar-icon">
        {/* Biểu tượng bình luận (comment) */}
        <FontAwesomeIcon icon={faCommentDots} style={{ width: '35px', height: '35px', color: 'white' }} />
        <p>{comments}</p> {/* Hiển thị số lượng bình luận */}
      </div>

      <div className="sidebar-icon">
        {/* Biểu tượng lưu (save) */}
        {saved ? (
          <FontAwesomeIcon icon={faBookmark} style={{ width: '35px', height: '35px', color: '#ffc107' }} onClick={() => setSaved(false)} />
        ) : (
          <FontAwesomeIcon icon={faBookmark} style={{ width: '35px', height: '35px', color: 'white' }} onClick={() => {
            setSaved(true); // Đánh dấu là đã lưu
            handleSaveClick(); // Sao chép URL video vào clipboard
          }} />
        )}
        <p>{saved ? saves + 1 : saves}</p> {/* Hiển thị số lượng đã lưu */}
      </div>

      <div className="sidebar-icon">
        {/* Biểu tượng chia sẻ (share) */}
        <FontAwesomeIcon icon={faShare} style={{ width: '35px', height: '35px', color: 'white' }} onClick={handleShareClick} />
        <p>{shares}</p> {/* Hiển thị số lượng chia sẻ */}
      </div>

      <div className="sidebar-icon mute">
        {/* Biểu tượng âm thanh */}
        <FontAwesomeIcon
          icon={muted ? faVolumeMute : faVolumeLow}
          style={{ width: '35px', height: '35px', color: 'white' }}
          onClick={handleMuteClick}
        />
      </div>

      <div className="sidebar-icon record">
        {/* Biểu tượng ghi âm (record) */}
        <img src="https://static.thenounproject.com/png/934821-200.png" alt="Record icon" />
      </div>

      {/* Popup chia sẻ khi người dùng click vào chia sẻ */}
      {isSharePopupVisible && (
        <div className="share-popup">
          <button className="close-popup" onClick={handleClosePopup}>
            X
          </button>
          <div className="share-icons">
            <FontAwesomeIcon icon={faFacebook} className="share-icon facebook" />
            <FontAwesomeIcon icon={faInstagram} className="share-icon instagram" />
            <FontAwesomeIcon icon={faThreads} className="share-icon threads" />
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterRight;
