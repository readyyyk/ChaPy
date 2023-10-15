
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
        const currentData = currentDataJSON === null ? {} : JSON.parse(currentDataJSON);

        // remove extra messages from object
        const maxLength = LocalData.getMaxNumber() || Infinity;
        for (let key of Object.keys(currentData)){
            if (Object.keys(currentData).length < maxLength)
                break;
            delete currentData[key];
        }

        const parsedData = JSON.parse(data.data);
        const id = parsedData.id || new Date().getTime()+"_";

        currentData[id] = {
            time: new Date().getTime(),
            event: data.event,
            data: JSON.stringify({
                ...parsedData,
                isOld: true,
                id: id,
            }),
        };
        localStorage.setItem(this.chatId, JSON.stringify(currentData));
    }

    /**
     * Returns object of raw messages saved for this chat
     * @return {{[id]: {event: string, data: string}}} - {id->data} pairs
     * */
    get() {
        const currentDataJSON = localStorage.getItem(this.chatId);
        return currentDataJSON === null ? {} : JSON.parse(currentDataJSON);
    }

    /**
     * Updates max. number of stored messages per chat
     * @param {number} number New max number
    * */
    static updateMaxNumber(number) {
        localStorage.setItem('LD-MAXLEN-PER-CHAT', String(number));
    }
    static getMaxNumber() {
        return Number(localStorage.getItem('LD-MAXLEN-PER-CHAT'));
    }
}