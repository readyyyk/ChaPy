import WordArray from 'crypto-js/lib-typedarrays.js'
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8.js';
import AES from 'crypto-js/aes.js'


export default class SSocketApi {
    link = "";
    dataCheckers = new Map(); // string func
    eventListeners = new Map(); // string func

    unemitted = [];

    constructor(link=`ws://${location.host}`, key="", globalCallback=(_)=>{}) {
        sessionStorage.setItem("SSA-WEBSOCKET-KEY", key)
        this.link = link;
        this.initSocket(link, globalCallback);
    }

    #getKey(){
        return Utf8.parse(sessionStorage.getItem("SSA-WEBSOCKET-KEY"))
    }

    /**
     * @param link {string} - string for WS connection
     * @param globalCallback {function({event: string, data: string}): void} - function that is called every time WebSocket receives message
     * */
    initSocket(link, globalCallback){
        this.socket = new WebSocket(link);

        this.socketHandler = (eventFetched) => {
            // add secure layer
            let encrypted = JSON.parse(eventFetched.data)
            let encryptedDataBase64 = encrypted["data"];
            let iv = Base64.parse(encrypted["iv"]);
            let decrypted = AES.decrypt(encryptedDataBase64, this.#getKey(), {iv: iv}).toString(Utf8);

            // call provided handler
            const {event, data} = JSON.parse(decrypted);

            globalCallback({event, data});

            this.eventListeners.has(event) ?
                this.eventListeners.get(event)(JSON.parse(data)) :
                console.error(`[WS] - No listener specified for event ('${event}')`)
        }
        this.socket.onmessage = this.socketHandler
    }

    addDataChecker(event, checkerFunc=function(_){return false}){
        // validate args
        if(!event instanceof String){
            console.error("[WS] - Event must be a `string`")
            return
        }
        if(!event instanceof Function){
            console.error("[WS] - New data checker must be a `Function`")
            return
        }

        // add new data checker
        this.dataCheckers.set(event, checkerFunc)
    }

    on(event, handlerFunc){
        // validate args
        if(!event instanceof String){
            console.error("[WS] - New event must be a `string`")
            return
        }
        if(!event instanceof Function){
            console.error("[WS] - New event handler must be a `Function`")
            return
        }

        // add new event listener
        this.eventListeners.set(event, handlerFunc)
    }

    waitForSocket(){
        return new Promise((resolve)=>{
            // if socket already loaded immediately resolve
            if(this.socket.readyState){
                resolve()
                return
            }

            // warn about loading connection and
            // when the socket is loaded call resolve
            console.warn("[WS] - Waiting for socket connection...")
            this.socket.onopen = ()=>resolve()
        })
    }
    emit(event="default", data={}){
        // check if the event is type of String
        if(!event instanceof String){
            console.error("[WS] - event must be a `String`!")
            return
        }

        // Validate data object with user-defined function
        if (this.dataCheckers.has(event)) {
            if(!this.dataCheckers.get(event)(data)){
                console.error(`[WS] - Data is not verified!`, "\nevent: ", event, "\ndata: ", data)
                return
            }
        } else {
            console.warn(`[WS] No data checker provided for event! (event: ${event})`)
        }

        // Push emit data to array for future use in case socket is not loaded
        if(!this.socket.readyState)
            this.unemitted.push({event: event, data: data})

        this.waitForSocket().then(()=>{
            // Rewrite current data with the data of the latest called event
            if(this.unemitted.length){
                const unemittedData = this.unemitted.shift()
                event = unemittedData.event
                data = unemittedData.data
            }

            // send data with data.data stringified to handle it like a string on server
            let dataForEncryption = JSON.stringify({
                event: event,
                data: JSON.stringify(data),
            })

            // add secure level
            let iv = WordArray.random(16);
            let encoded = AES.encrypt(dataForEncryption, this.#getKey(), {iv})
            this.socket.send(JSON.stringify({data: encoded.ciphertext.toString(Base64), iv: encoded.iv.toString(Base64)}))

            // if there are any uncalled events call it
            if(this.unemitted.length){
                this.emit(this.unemitted[0].event, this.unemitted[0].data)
            }
        })
    }
}