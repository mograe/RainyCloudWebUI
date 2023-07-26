import { v4 as uuidv4 } from "uuid";
function chillHop() {
	return [
		{
			name: "Vice City",
			cover:
				"https://upload.wikimedia.org/wikipedia/ru/2/26/V_City-PS2.jpg",
			video: "file:///D:/git-repositories/Unity-VR-360Player/Assets/_Videos/vc.mp4",
			color: ["#205950", "#2ab3bf"],
			id: uuidv4(),
			active: true,
		},
		{
			name: "Sponge Bob",
			cover:
				"https://mediacloud.theweek.com/image/private/s--l7xn7aqd--/f_auto,t_primary-image-mobile@1/v1608207876/33011_article_full.jpg",
			video: "file:///D:/git-repositories/Unity-VR-360Player/Assets/_Videos/sb.mp4",
			color: ["#EF8EA9", "#ab417f"],
			id: uuidv4(),
			active: false,
		},
		//ADD MORE HERE
	];
}

export default chillHop;
