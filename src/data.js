import { v4 as uuidv4 } from "uuid";
function chillHop() {
	return [
		{
			name: "rollercoaster of hell",
			cover:
				"",
			video: "file:///storage//emulated//0//Movies//rollercoaster of hell.mp4",
			color: ["#205950", "#2ab3bf"],
			id: uuidv4(),
			active: true,
		},
		{
			name: "light",
			cover:
				"",
			video: "file:///storage//emulated//0//Movies//output1080.mp4",
			color: ["#EF8EA9", "#ab417f"],
			id: uuidv4(),
			active: false,
		},
		//ADD MORE HERE
	];
}

export default chillHop;
