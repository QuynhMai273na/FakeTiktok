import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";

// Array holding video details with unique id for each video
const videoUrls = [
  {
    videoId: 1,
    url: require("./videos/video1.mp4"),
    profilePic: "https://example.com/video1.jpg",
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    videoId: 2,
    url: require("./videos/video2.mp4"),
    profilePic: "https://example.com/video2.jpg",
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    videoId: 3,
    url: require("./videos/video3.mp4"),
    profilePic: "https://example.com/video3.jpg",
    username: "wojciechtrefon",
    description:
      "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    videoId: 4,
    url: require("./videos/video4.mp4"),
    profilePic: "https://example.com/video4.jpg",
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const startY = useRef(null);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [showInfo, setShowInfo] = useState(false); // Ensure the state is defined

  useEffect(() => {
    setVideos(videoUrls);
    setFilteredVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement
            .play()
            .catch((error) => console.error("Error: ", error));
        } else {
          entry.target.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  const handleNextVideo = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleMouseDown = (event) => {
    startY.current = event.clientY;
  };

  const handleMouseUp = (event) => {
    const threshold = 100;
    if (startY.current === null) return;

    const deltaY = event.clientY - startY.current;
    startY.current = null;

    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0) {
        handlePreviousVideo();
      } else {
        handleNextVideo();
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") {
        setShowInfo(true); // Toggle the video info visibility when pressing ArrowRight
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex]);

  const handleSearch = (query) => {
    if (query.startsWith("#")) {
      const filtered = videos.filter((video) =>
        video.description.includes(query)
      );
      setFilteredVideos(filtered);
      setCurrentIndex(0);
    } else {
      alert("Please start your search with a hashtag (#).");
    }
  };

  return (
    <div
      className="app"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="container">
        <TopNavbar className="top-navbar" onSearch={handleSearch} />
        {filteredVideos.map((video, index) => (
          <VideoCard
            key={index}
            videoId={video.videoId}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === currentIndex}
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
        
        {showInfo && (
          <div className="video-info">
            <button className="close-btn" onClick={() => setShowInfo(false)}>X</button>
            <h3>{videos[currentIndex].username}</h3>
            <p>{videos[currentIndex].description}</p>
            <p>{`Likes: ${videos[currentIndex].likes}`}</p>
            <p>{`Comments: ${videos[currentIndex].comments}`}</p>
            <p>{`Saves: ${videos[currentIndex].saves}`}</p>
            <p>{`Shares: ${videos[currentIndex].shares}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
