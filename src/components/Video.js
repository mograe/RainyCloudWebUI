import React from "react";
import styled from "styled-components";

const Video = ({ currentVideo }) => {
	return (
		<VideoContainer>
			<Img src={currentVideo.cover} alt={currentVideo.name}></Img>
			<H1>{currentVideo.name}</H1>
			<H2>{currentVideo.artist}</H2>
		</VideoContainer>
	);
};

const VideoContainer = styled.div`
	margin-top: 10vh;
	min-height: 50vh;
	max-height: 60vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Img = styled.img`
	width: 20%;
	border-radius: 50%;
	@media screen and (max-width: 768px) {
		width: 50%;
	}
`;

const H1 = styled.h2`
	padding: 3rem 1rem 1rem 1rem;
`;

const H2 = styled.h3`
	font-size: 1rem;
`;

export default Video;
