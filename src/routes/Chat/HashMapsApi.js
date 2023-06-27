/**
 * Client API for github.com/readyyyk/hashMaps
*/
class HashMapApi {
    models = ['hashmap', 'picsum'];

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
     * @param {string} model - service to use (picsum | hashmaps)
     * @param {number} w - width in pixels
     * @param {number} h - height in pixels
     */
    link(seed, model, w=7, h=7) {
        if (!this.models.includes(model)) {
            console.error(`No such model - ${model}`);
            return;
        }
        return `${this.host}/${model}?seed=${seed}&w=${w}&h=${h}`;
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

export default new HashMapApi(import.meta.env.VITE_HASHMAP_API_LINK);
