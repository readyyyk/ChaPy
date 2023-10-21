const maxNotificationLines = 7;

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
        sw = await navigator.serviceWorker.register(`./setupNotification.js`);
    }
})();


/**
 * @return {Promise<{title: string, options: {
 *     tag: string,
 *     body: string,
 *     icon: string,
 *     badge: 'https://chapy-beta.netlify.app/chapy192.png',
 *     [renotify]: true,
 * }}>}
 * */
const createNotification = async (title, text, icon, id) => {
    const res = {
        title,
        options: {
            tag: id,
            body: text,
            badge: 'https://chapy-beta.netlify.app/chapy192.png',
            icon: icon || 'https://chapy-beta.netlify.app/chapy192.png',
        },
    };

    if (id!=='interaction')
        return res

    res.title = 'New messages';
    res.options.renotify = true;

    const currentNotifications = await sw.getNotifications({tag: id});
    let currentText = currentNotifications[0] ? currentNotifications[0].body+'\n' : '';
    let isCurrentUpdated = false;
    while([...currentText.matchAll(/[^\n].+(\n|$)/g)].length > maxNotificationLines) {
        currentText = currentText.replace(/^.+\n/g, '');
        isCurrentUpdated = true;
    }
    if (isCurrentUpdated)
        currentText = '...\n'+currentText;
    const newText = title.length > 0 ? `${title}: ${text}` : `- ${text}`;

    res.options.body = currentText + newText;

    return res;
}

const closeNotifications = async () => {
    const current = await sw.getNotifications();
    current.forEach(n => n.close());
}

/**
 * @param {string} title
 * @param {string} text
 * @param {string} [icon='https://chapy-beta.netlify.app/favicon.ico']
 * @param {string} id
 * */
const notification = (title, text, icon, id='') => {
    let isVisible = !document.hidden;
    document.addEventListener("visibilitychange", () => {
        isVisible = !document.hidden;
        if (isVisible)
            closeNotifications();
    });
    if(isVisible)
        return;

    if (!sw) {
        console.error('No service worker found!');
        return;
    }

    createNotification(title, text, icon, id).then(res=> {
        sw.showNotification(res.title, res.options);
    });
}

export default notification;