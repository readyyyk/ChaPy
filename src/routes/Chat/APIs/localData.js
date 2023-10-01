
/**
 * Specific class to use data saved in localStorage
 * */
export default class LocalData {
    chatId;

    /**
     * @param {string} chatId - current chat id
     * */
    constructor(chatId) {
        this.chatId = chatId;
    }

    /**
     * Writes data object to localStorage
     * @param data {Object} - raw message Object to save (event type and data of message)
     * @param data.event {string} - name of event
     * @param data.data {string} - JSON stringified object containing data about event
     * */
    save(data) {
        const currentDataJSON = localStorage.getItem(this.chatId.toString());
        const currentData = currentDataJSON === null ? [] : JSON.parse(currentDataJSON);
        const maxLength = Number(localStorage.getItem("LD-MAXLEN-PER-CHAT")) || Infinity;
        while(currentData.length >= maxLength){
            currentData.shift();
        }
        currentData.push({
            time: new Date().getTime(),
            ...data,
        });
        localStorage.setItem(this.chatId, JSON.stringify(currentData));
    }

    /**
     * Returns array of raw messages saved for this chat
     * @return {[{text: string, sender:(string), type:('message'|'server')}]}
     * */
    get() {
        const currentDataJSON = localStorage.getItem(this.chatId);
        return currentDataJSON === null ? [] : JSON.parse(currentDataJSON);
    }
}