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

    if (event.action === 'view') {
        event.waitUntil(self.clients.openWindow(`${self.location.origin}/card/${data.slug}`));
    } else if (event.action === 'dismiss') {
        event.notification.close();
    }
});
