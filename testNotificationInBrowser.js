import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const CardNotification = () => {
    const [cards, setCards] = useState([
        { id: 1, title: 'Card 1', dueDate: '2024-12-06T10:00:00.000Z' },
        { id: 2, title: 'Card 2', dueDate: '2024-12-07T10:00:00.000Z' },
    ]);

    // Yêu cầu quyền thông báo
    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then((permission) => {
                if (permission !== 'granted') {
                    console.warn('Notification permission denied.');
                }
            });
        }
    }, []);

    // Kiểm tra ngày đến hạn
    const checkDueDates = () => {
        const now = dayjs(new Date()).toISOString();
        cards.forEach((card) => {
            if (now === card.dueDate) {
                sendNotification(card.title); // Gửi thông báo nếu đến hạn
            }
        });
    };

    // Hàm gửi thông báo
    const sendNotification = (title) => {
        if (Notification.permission === 'granted') {
            const notification = new Notification(`Card "${title}" is due now!`, {
                body: 'Hãy kiểm tra và xử lý ngay!',
                icon: 'https://via.placeholder.com/100', // URL icon tùy chỉnh
                vibrate: [200, 100, 200], // Rung (chỉ hoạt động trên thiết bị hỗ trợ)
                badge: 'https://via.placeholder.com/50', // Icon nhỏ hiển thị trên màn hình
                actions: [
                    { action: 'view', title: 'Xem chi tiết', icon: 'https://via.placeholder.com/50' },
                    { action: 'dismiss', title: 'Bỏ qua', icon: 'https://via.placeholder.com/50' },
                ],
                requireInteraction: true, // Thông báo sẽ không tự động biến mất
                tag: 'card-due', // Gắn tag để tránh tạo trùng lặp thông báo
            });

            // Xử lý khi người dùng nhấp vào thông báo
            notification.onclick = () => {
                window.open('http://localhost:5173', '_blank');
                notification.close(); // Đóng thông báo sau khi nhấp
            };

            // Xử lý khi thông báo bị đóng
            notification.onclose = () => {
                console.log('Thông báo đã bị đóng.');
            };

            // Xử lý lỗi (nếu có)
            notification.onerror = (err) => {
                console.error('Lỗi thông báo:', err);
            };
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            checkDueDates();
        }, 1000); // Kiểm tra mỗi giây

        return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
    }, [cards]);

    return (
        <div>
            <h1>Card List</h1>
            {cards.map((card) => (
                <div key={card.id}>
                    <h2>{card.title}</h2>
                    <p>Due Date: {dayjs(card.dueDate).format('YYYY-MM-DD HH:mm:ss')}</p>
                </div>
            ))}
        </div>
    );
};

export default CardNotification;
