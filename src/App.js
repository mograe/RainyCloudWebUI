import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import "./App.css";

// Import components
import Player from "./components/Player";
import Video from "./components/Video";
import Library from "./components/Library";
import Nav from "./components/Nav";
import Credit from "./components/Credit";
// Import data
import data from "./data";

import VideoClient from "./VideoClient";

const videoClient = new VideoClient("http://localhost:3001/");

const App = () => {
	// Ref
	const audioRef = useRef(null);

	// State
	const [videos, setVideos] = useState(data());
	const [currentVideo, setCurrentVideo] = useState(videos[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [libraryStatus, setLibraryStatus] = useState(false);
	const [videoInfo, setVideoInfo] = useState({
		currentTime: 0,
		duration: 0,
	});

	//Effects
	useEffect(() => {videoClient.setSrc(currentVideo); setIsPlaying(true)}, [currentVideo])
	useEffect(() => {
		videoClient.socket.on('user-is-connected', () => {
			videoClient.setSrc(videoClient._src, false); setIsPlaying(true);
		})}, [videoClient.socket]);
	/*useEffect(() => {
		const interval = setInterval(() => 
		{console.log(videoClient._videoInfo)
		}, 100);
		return () => clearInterval(interval);
	}, [])*/

	// Functions

	const videoEndHandler = async () => {
		let currentIndex = videos.findIndex((video) => video.id === currentVideo.id);
		let nextVideo = videos[(currentIndex + 1) % videos.length];
		await setCurrentVideo(nextVideo);

		const newVideos = videos.map((video) => {
			if (video.id === nextVideo.id) {
				return {
					...video,
					active: true,
				};
			} else {
				return {
					...video,
					active: false,
				};
			}
		});
		setVideos(newVideos);

		if (isPlaying) {
			audioRef.current.play();
		}
	};

	return (
		<AppContainer libraryStatus={libraryStatus}>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Video currentVideo={currentVideo} />
			<Player
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentVideo={currentVideo}
				setCurrentVideo={setCurrentVideo}
				videoClient={videoClient}
				videoInfo={videoInfo}
				setVideoInfo={setVideoInfo}
				videos={videos}
				setVideos={setVideos}
			/>
			<Library
				videos={videos}
				setCurrentVideo={setCurrentVideo}
				videoClient={videoClient}
				isPlaying={isPlaying}
				setVideos={setVideos}
				libraryStatus={libraryStatus}
			/>
			<Credit />
		</AppContainer>
	);
};

const AppContainer = styled.div`
	transition: all 0.5s ease;
	margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
	@media screen and (max-width: 768px) {
		margin-left: 0;
	}
`;

export default App;
