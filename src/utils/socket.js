import { io } from "socket.io-client";
import { BASE_URL } from "./api";
export const socket = io.connect(BASE_URL);
