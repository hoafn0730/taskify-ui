export const registerNotification = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(
            (registration) => {
                console.log('Service Worker registered:', registration);
            },
            (err) => {
                console.error('Service Worker registration failed:', err);
            },
        );
    }
};

export const cancelNotification = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => {
                registration.unregister().then((boolean) => {
                    if (boolean) {
                        console.log('Service Worker đã được hủy đăng ký.');
                    } else {
                        console.log('Không thể hủy đăng ký Service Worker.');
                    }
                });
            });
        });
    }
};

export const sendNotification = (data, type) => {
    if (Notification.permission === 'granted') {
        if (type) {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then((registration) => {
                    registration.showNotification('Card is due now!', {
                        body: 'Hãy kiểm tra và xử lý ngay!',
                        icon: 'https://via.placeholder.com/100',
                        actions: [
                            { action: 'view', title: 'Xem chi tiết', icon: 'https://via.placeholder.com/50' },
                            { action: 'dismiss', title: 'Bỏ qua', icon: 'https://via.placeholder.com/50' },
                        ],
                        tag: 'card-due',
                        requireInteraction: true,
                        data: {
                            slug: data.slug,
                        },
                    });
                });
            }
            return;
        }

        const notification = new Notification(`Card  is due now!`, {
            body: 'Hãy kiểm tra và xử lý ngay!',
            icon: 'https://via.placeholder.com/100', // URL icon tùy chỉnh
            vibrate: [200, 100, 200], // Rung (chỉ hoạt động trên thiết bị hỗ trợ)
            badge: 'https://via.placeholder.com/50', // Icon nhỏ hiển thị trên màn hình
            // requireInteraction: true, // Thông báo sẽ không tự động biến mất
            // tag: 'card-due' + count, // Gắn tag để tránh tạo trùng lặp thông báo
        });

        // Xử lý khi người dùng nhấp vào thông báo
        notification.onclick = () => {
            window.open('http://localhost:5173/ádfs');
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
