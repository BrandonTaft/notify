import { io } from "socket.io-client";
const socket = io.connect("https://593b-2600-6c5a-4a7f-463a-61b3-94e3-5c2a-117f.ngrok-free.app");
export default socket;