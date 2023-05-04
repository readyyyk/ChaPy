
const imgContainer = document.querySelector("#msg-container")
const socket = io("http://localhost:3001")

class Message {
    constructor(text, owner) {
        this.text = text
        this.owner = owner
    }
    render(){
        const el = document.createElement("div")
        const isThisUser = this.owner.name === localStorage.getItem("chatbin-user")
        el.classList.add("container-fluid", "d-flex", "justify-content-end px-0", "message",
            isThisUser?"message-y":"message-ny")
        el.innerHTML = `
            <div style="max-width: 90%;" class="d-flex align-items-center flex-row${isThisUser?"-reverse":""}">
                <div class="d-flex flex-column align-items-center user__info">
                    <img src="${this.owner.imageSrc}" alt="logo"
                         class="rounded mx-2 mx-md-4">
                    <span> ${this.owner.name} </span>
                </div>
                <div class="${isThisUser?"bg-primary":"bg-secondary"} p-3 rounded" style="--bs-bg-opacity: 0.4">
                    ${this.text}
                </div>
            </div>
            `
        imgContainer.append(el)
    }
}

socket.onmessage = e => {
    new Message(e.data.text, e.data.owner).render()
}