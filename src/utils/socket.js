import { io } from "socket.io-client";
const socket = io.connect("https://ab44-2600-6c5a-4a7f-463a-25d9-df0b-3d2c-aa64.ngrok-free.app");
export default socket;