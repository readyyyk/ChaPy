self.addEventListener('notificationclick', (e) => {
    console.log(self.clients);
    e.waitUntil(
        (async () => {
            const clientList = await self.clients.matchAll({
                includeUncontrolled: true,
                type: 'window',
            });
            for (const client of clientList) {
                console.log(client);
                await client.focus();
            }
        })(),
        e.notification.close,
    );
});
