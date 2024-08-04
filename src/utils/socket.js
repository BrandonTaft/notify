import { io } from "socket.io-client";
const URL ="https://3e70-2600-6c5a-4a7f-463a-60be-4176-cf8a-a137.ngrok-free.app"
//export const socket = io.connect("https://4e52-75-131-25-248.ngrok-free.app");
export const socket = io(URL, { autoConnect: false });
socket.onAny((event, ...args) => {
    console.log("PRINTED FROM SOCKET",event, args);
  });


