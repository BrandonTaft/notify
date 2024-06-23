import { io } from "socket.io-client";
// const socket = io.connect(BASE_URL);
export const socket = io("https://2718-75-131-25-248.ngrok-free.app");
//export const socket = io(BASE_URL, { autoConnect: false });
//export const privateSocket = io("https://2718-75-131-25-248.ngrok-free.app/private" , { autoConnect: false });