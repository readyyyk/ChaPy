class HashMapApi{
    constructor(host) {
        this.host = host
    }
    link(seed, w=7, h=7){
        return `${this.host}?seed=${seed}&w=${w}&h=${h}`
    }
    async image(seed, w=7, h=7){
        const img = await fetch(`${this.host}?seed=${seed}&w=${w}&h=${h}`)
        return img.body
    }
}

export default new HashMapApi("http://167.172.179.35:3001/render")