class NotificationsApi {
    constructor(func) {
        (async function(){await Notification.requestPermission()})()
        this.openFunc = func
    }
    notification(owner, text, img){
        const nf = new Notification(`${owner}`, {
            body: text,
            icon: img
        });
        nf.onclick = this.openFunc
    }
}
notificationsApi = new NotificationsApi(()=>window.open(this.location))