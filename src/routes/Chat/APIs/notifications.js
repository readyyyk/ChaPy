export const askNotificationPermission = async () => {
    if (!("Notification" in window)) {
        console.error("This browser does not support notifications.");
        return 'not supported';
    }
    return await Notification.requestPermission();
}

let sw = null;
(async()=> {
    sw = await navigator.serviceWorker.getRegistration();
    if (!sw) {
        sw = await navigator.serviceWorker.register('./emptySW.js');
    }
})();

const notification = (title, text, image='https://chapy-beta.netlify.app/favicon.ico', tag='') => {
    let isVisible = !document.hidden;
    document.addEventListener("visibilitychange", () => {
        isVisible = !document.hidden;
    });
    if(isVisible)
        return;

    try {
        new Notification(title, {
            tag: tag,
            body: text,
            icon: image,
            badge: 'https://chapy-beta.netlify.app/favicon.ico',
            vibrate: true,
        });
    } catch (e) {
        if (sw) {
            sw.showNotification(title, {
                tag: tag,
                body: text,
                icon: image,
                badge: 'https://chapy-beta.netlify.app/favicon.ico',
            });
            return;
        }
        console.error(e);
    }
}

export default notification;