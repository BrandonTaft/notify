import { io } from "socket.io-client";
const socket = io.connect("https://99ff-2600-6c5a-4a7f-463a-9552-e6ff-d168-230b.ngrok-free.app");
export default socket;