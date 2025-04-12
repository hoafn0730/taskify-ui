import { io } from 'socket.io-client';

const socket = io('https://dev.fdemy.id.vn:5000', {
    withCredentials: true,
    extraHeaders: {
        // 'my-custom-header': 'abcd',
    },
});

export default socket;
