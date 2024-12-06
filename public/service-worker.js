self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.icon,
            actions: data.actions,
            tag: data.tag,
        }),
    );
});

self.addEventListener('notificationclick', (event) => {
    const data = event.notification.data;
    console.log('🚀 ~ self.addEventListener ~ data:', data);

    if (event.action === 'view' && data?.slug) {
        event.waitUntil(clients.openWindow(`http://localhost:5173/card/${data.slug}`));
    } else if (event.action === 'dismiss') {
        event.notification.close();
    }
});
