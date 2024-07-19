import { io } from "socket.io-client";
const URL ="https://4e52-75-131-25-248.ngrok-free.app"
//export const socket = io.connect("https://4e52-75-131-25-248.ngrok-free.app");
export const socket = io(URL, { autoConnect: false });
socket.onAny((event, ...args) => {
    console.log("PRINTED FROM SOCKET",event, args);
  });


