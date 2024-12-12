import React from "react";
import './ProfilePage.css';

const ProfilePage = ({ video }) => {
  if (!video) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div className="profile-page">
      <h1>{video.username}'s Profile</h1>
      <div className="video-info">
        <img src={video.profilePic} alt={video.username} className="profile-pic" />
        <p><strong>Description:</strong> {video.description}</p>
        <p><strong>Song:</strong> {video.song}</p>
        <p><strong>Likes:</strong> {video.likes}</p>
        <p><strong>Comments:</strong> {video.comments}</p>
        <p><strong>Saves:</strong> {video.saves}</p>
        <p><strong>Shares:</strong> {video.shares}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
