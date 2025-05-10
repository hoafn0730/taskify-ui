import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
    extraHeaders: {
        // 'my-custom-header': 'abcd',
    },
});

export default socket;
