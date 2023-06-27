/**
 * Client API for github.com/readyyyk/ChatBin-server
*/
class ChatBinApi {
    httpLink = '';
    wsLink = '';
    room = '';
    /**
     * @constructor
     * @param {string} roomName id of the chat you are want to work with
     * @param {URL} apiLink link to running api
     * */
    constructor(roomName='', apiLink) {
        if (!roomName || !/^([a-zA-Z]{5})$/.test(roomName)) {
            console.error('Provide valid roomName (5 alphabet symbols)');
            return;
        }
        if (!apiLink instanceof URL) {
            // API link validation can be added with required header
            console.error('Provide Api link wrapped in `new URL` constructor');
            return;
        }
        if (!apiLink.protocol.startsWith('http')) {
            // API link validation can be added with required header
            console.error('Provide Api link with HTTP or HTTPS protocol');
            return;
        }
        this.room = roomName;
        this.httpLink = apiLink.href;
        this.wsLink = apiLink.href.replace('http', 'ws')+this.room+'/ws';
    }
    /**
     * @constructor
     * @param {string} name the name you want to check on existence
     * @return {bool}
     * */
    async checkName(name='') {
        if (name==='' || name.length>30 || !/^\w+$/.test(name)) {
            console.error('Provide valid name (only word characters)');
            return;
        }
        let isValid = false;
        await fetch(this.httpLink+this.room+'/names?name='+name)
            .then((res)=> isValid=res.ok);
        return isValid;
    }
}

export default ChatBinApi;
