import { io } from "socket.io-client";
const socket = io.connect("https://3acd-2600-6c5a-4a7f-463a-2937-190f-5be3-36f5.ngrok-free.app");
export default socket;