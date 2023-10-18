self.addEventListener('notificationclick', (e) => {
    e.notification.close();
});
