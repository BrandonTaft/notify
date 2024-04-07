import { io } from "socket.io-client";
const socket = io.connect("https://a15d-2600-6c5a-4a7f-463a-4d63-72d-f6a2-48ca.ngrok-free.app");
export default socket;