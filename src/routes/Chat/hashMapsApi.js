/**
 * Singleton io container fot github.com/readyyyk/hashMaps
*/
class HashMapApi {
    /**
     * @constructor
     * @param {string} host - host that handles api
     */
    constructor(host) {
        this.host = host;
    }

    /**
     * returns LINK with provided:
     * @constructor
     * @param {string} seed - seed to generate
     * @param {number} w - width in pixels
     * @param {number} h - height in pixels
     */
    link(seed, w=7, h=7) {
        return `${this.host}?seed=${seed}&w=${w}&h=${h}`;
    }
    /**
     * returns IMAGE with provided:
     * @constructor
     * @param {string} seed - seed to generate
     * @param {number} w - width in pixels
     * @param {number} h - height in pixels
     */
    async image(seed, w=7, h=7) {
        const img = await fetch(`${this.host}?seed=${seed}&w=${w}&h=${h}`);
        return img.body;
    }
}

export default new HashMapApi('http://167.172.179.35:3001/render');
