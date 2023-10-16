import LocalData from './APIs/localData.js';


// eslint-disable-next-line max-len
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
const unixRegex = /^[0-9]{13}_$/;

/**
 * Updater func for setState react function.
 * @callback updaterSetState
 * @param {any} data - Data.
 * @return void
*/
/**
 * setState react function.
 * @callback setState
 * @param {updaterSetState | any} updater - Data.
 * @return void
 */

const actions = {
    /**
     * @param {{
     *      id: string,
     *      text: string,
     *      sender: string,
     * }} data
     * @param {string} userName
     * @return {{
     *      id: string,
     *      text: string,
     *      sender: string,
     *      type: 'message',
     * }}
     * */
    message: (data, userName) => {
        return {
            ...data,
            sender: data.sender || userName,
            type: 'message',
        };
    },

    /**
     * @param {{
     *      id: string,
     *      text: string,
     *      name: string,
     *      sender: string,
     *      detail: string,
     * }} data
     * @return {{
     *      id: string,
     *      name: string,
     *      detail: string,
     *      type: 'server',
     * }}
     * */
    connection: (data) => {
        return {
            ...data,
            text: data.name + ' ' + data.detail,
            sender: data.name,
            type: 'server',
        };
    },
};

/**
 * Helper function to add messages to state
 * @param {Array<{
 *      id: string,
 *      text: string,
 *      sender: string,
 *      type: 'message',
 * } | {
 *      id: string,
 *      name: string,
 *      detail: string,
 *      type: 'server',
 * }>} data Data to add to state
 * @param {setState} setMsgs setState function
 * @return {void}
 * */
const addMessages = (data, setMsgs) => setMsgs((prev) => [...prev, ...data]);

/**
 * Helper function to add OLD messages to state
 * @param {{name: string, data: {id: {event: string, data: string}}}|null} [data]
 * @param {string} chatId
 * @param {number} userConnTime
 * @param {setState} setMsgs
 * @return {void}
 * */
const addOldMessages = (data, chatId, userConnTime, setMsgs) => {
    const histCurrent = new LocalData(chatId).get();
    const histMerged = {
        ...data?.data,
        ...histCurrent,
    };
    let histMsgsList = [];

    for (const key in histMerged) {
        if (!uuidRegex.test(key) && !unixRegex.test(key)) {
            continue;
        }
        if (histMerged[key].time >= userConnTime) {
            continue;
        }
        const el = histMerged[key];
        histMsgsList.push(el);
    }
    histMsgsList = histMsgsList.sort((a, b) => a.time - b.time);
    histMsgsList = histMsgsList.map((el)=> {
        const parsed = JSON.parse(el.data);
        return actions[el.event](parsed);
    });
    setMsgs((prev)=> {
        const result = [...histMsgsList, ...prev.filter((el)=>!el.isOld)];
        result.forEach((el, i) => {
            if (unixRegex.test(el.id) && i < result.length-1 &&
                el?.detail === result[i+1]?.detail) {
                const compareKeys = Object.keys(el).filter((el)=>el!=='id');
                for (const compareKey of compareKeys) {
                    if (el[compareKey] !== result[i+1][compareKey]) {
                        return;
                    }
                }
                result.splice(i, 1);
            }
        });
        return result;
    });
};

export {actions, addMessages, addOldMessages};
