import { io } from "socket.io-client";
const URL ="https://80c1-2600-6c5a-4a7f-463a-5ae-e745-58ef-f8b9.ngrok-free.app"
//export const socket = io.connect("https://4e52-75-131-25-248.ngrok-free.app");
export const socket = io(URL, { autoConnect: false });
socket.onAny((event, ...args) => {
    console.log("PRINTED FROM SOCKET",event, args);
  });


