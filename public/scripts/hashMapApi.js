class HashMapApi{
    constructor() {
        this.host = "http://167.172.179.35:3001/render"
    }
    link(seed, w=7, h=7){
        return `${this.host}?seed=${seed}&w=${w}&h=${h}`
    }
    async image(seed, w=7, h=7){
        const img = await fetch(`${this.host}?seed=${seed}&w=${w}&h=${h}`)
        return img.body
    }
}

const hashMapApi = new HashMapApi()