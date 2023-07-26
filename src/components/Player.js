import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// style
const pointer = { cursor: "pointer" };

const Player = ({
	currentVideo,
	setCurrentVideo,
	isPlaying,
	setIsPlaying,
	videoClient,
	videoInfo,
	setVideoInfo,
	videos,
	setVideos,
}) => {
	// Event handlers
	const playSongHandler = () => {
		if (isPlaying) {
			videoClient.pause();
			setIsPlaying(!isPlaying);
		} else {
			videoClient.play();
			setIsPlaying(!isPlaying);
		}
	};

	const togglePlayPauseIcon = () => {
		if (isPlaying) {
			return faPause;
		} else {
			return faPlay;
		}
	};

	const getTime = (time) => {
		let minute = Math.floor(time / 60);
		let second = ("0" + Math.floor(time % 60)).slice(-2);
		return `${minute}:${second}`;
	};

	//TODO: Перематывать видео? Хуй знает надо ли оно но навсякий случай
	/*const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...videoInfo, currentTime: e.target.value });
	};*/

	const skipTrackHandler = async (direction) => {
		let currentIndex = videos.findIndex((video) => video.id === currentVideo.id);
		if (direction === "skip-forward") {
			await setCurrentVideo(videos[(currentIndex + 1) % videos.length]);
			activeLibraryHandler(videos[(currentIndex + 1) % videos.length]);
		} else if (direction === "skip-back") {
			if ((currentIndex - 1) % videos.length === -1) {
				await setCurrentVideo(videos[videos.length - 1]);
				activeLibraryHandler(videos[videos.length - 1]);
			} else {
				await setCurrentVideo(videos[(currentIndex - 1) % videos.length]);
				activeLibraryHandler(videos[(currentIndex - 1) % videos.length]);
			}
		}
		if (isPlaying) {
			videoClient.play();
		}
	};

	const activeLibraryHandler = (newVideo) => {
		const newVideos = videos.map((video) => {
			if (video.id === newVideo.id) {
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
	};

	return (
		<PlayerContainer>
			<TimeControlContainer>
				<P>{getTime(videoInfo.currentTime || 0)}</P>
				<Track currentVideo={currentVideo}>
					<AnimateTrack videoInfo={videoInfo}></AnimateTrack>
				</Track>

				<P>{getTime(videoInfo.duration || 0)}</P>
			</TimeControlContainer>

			<PlayControlContainer>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-back")}
					className="skip-back"
					icon={faAngleLeft}
					size="2x"
					style={pointer}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					icon={togglePlayPauseIcon()}
					size="2x"
					style={pointer}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-forward")}
					className="skip-forward"
					icon={faAngleRight}
					size="2x"
					style={pointer}
				/>
			</PlayControlContainer>
		</PlayerContainer>
	);
};

const PlayerContainer = styled.div`
	min-height: 20vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const TimeControlContainer = styled.div`
	margin-top: 5vh;
	width: 50%;
	display: flex;
	@media screen and (max-width: 768px) {
		width: 90%;
	}
`;

const Track = styled.div`
	background: lightblue;
	width: 100%;
	height: 1rem;
	position: relative;
	border-radius: 1rem;
	overflow: hidden;
	background: linear-gradient(to right, ${(p) => p.currentVideo.color[0]}, ${(p) => p.currentVideo.color[1]});
`;

const AnimateTrack = styled.div`
	background: rgb(204, 204, 204);
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	transform: translateX(${(p) => Math.round((p.videoInfo.currentTime * 100) / p.videoInfo.duration) + "%"});
	pointer-events: none;
`;

const Input = styled.input`
	width: 100%;
	-webkit-appearance: none;
	background: transparent;
	cursor: pointer;
	/* padding-top: 1rem;
	padding-bottom: 1rem; */
	&:focus {
		outline: none;
		-webkit-appearance: none;
	}
	@media screen and (max-width: 768px) {
		&::-webkit-slider-thumb {
			height: 48px;
			width: 48px;
		}
	}
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 16px;
		width: 16px;
		background: transparent;
		border: none;
	}
	&::-moz-range-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
	&::-ms-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
	&::-moz-range-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
`;

const P = styled.p`
	padding: 0 1rem 0 1rem;
	user-select: none;
`;

const PlayControlContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	width: 30%;
	@media screen and (max-width: 768px) {
		width: 60%;
	}
`;

export default Player;
