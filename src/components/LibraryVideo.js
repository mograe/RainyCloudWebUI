import React from "react";
import styled from "styled-components";

const LibraryVideo = ({ video, setCurrentVideo, videoClient, isPlaying, videos, setVideos }) => {
	// Function
	const videoSelectHandler = async () => {
		await setCurrentVideo(video);
		const curVideo = video;
		const videoList = videos;

		const newVideos = videoList.map((video) => {
			if (video.id === curVideo.id) {
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

		// check if user is wanting to play a video.
		if (isPlaying) {
			videoClient.play();
		}
	};

	return (
		<SetCurrentVideo onClick={videoSelectHandler} isActive={video.active}>
			<Img src={video.cover} alt={video.name}></Img>
			<LibrarySongDescription>
				<H1>{video.name}</H1>
				<H2>{video.artist}</H2>
			</LibrarySongDescription>
		</SetCurrentVideo>
	);
};
const SetCurrentVideo = styled.div`
	padding: 0 2rem 0 2rem;
	height: 100px;
	width: 100%;
	display: flex;
	transition: all 0.3s ease;
	background-color: ${(p) => (p.isActive ? "pink" : "white")};
	&:hover {
		background-color: lightblue;
		transition: all 0.3s ease;
	}
	&.active {
		background-color: pink;
	}
`;

const LibrarySongDescription = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Img = styled.img`
	margin: 20px 0;
	height: 60px;
`;

const H1 = styled.h3`
	padding-left: 1rem;
	font-size: 1rem;
`;

const H2 = styled.h4`
	padding-left: 1rem;
	font-size: 0.7rem;
`;

export default LibraryVideo;
