import { io } from "socket.io-client";
const socket = io.connect("https://bae7-75-131-25-248.ngrok-free.app");
export default socket;