const
    host = "ws://localhost:3000",
    currentUser = prompt("Ur name")

const
    msgContainer = document.querySelector("#msg-container"),
    sbmBtn = document.querySelector("#submit"),
    msgInput = document.querySelector("#text-input")

const
    socket = io(host)

class Message {
    constructor(text, owner) {
        this.text = text
        this.owner = owner
    }
    render(){
        const el = document.createElement("div")
        const isThisUser = this.owner === currentUser
        el.classList.add("container-fluid", "d-flex", `justify-content-${isThisUser?"end":"start"}`, "px-0", "message",
            isThisUser?"message-y":"message-ny")
        el.innerHTML = `
            <div style="max-width: 90%;" class="d-flex align-items-center flex-row${isThisUser?"-reverse":""}">
                <div class="d-flex flex-column align-items-center user__info">
                    <img src="${this.owner.imageSrc}" alt=""
                         class="rounded mx-2 mx-md-4">
                    <span> ${this.owner} </span>
                </div>
                <div class="${isThisUser?"bg-primary":"bg-secondary"} p-3 rounded" style="--bs-bg-opacity: 0.4">
                    ${this.text}
                </div>
            </div>
            `
        msgContainer.append(el)
    }
}

window.addEventListener("keydown", (e)=>{
    if(e.key==="Enter")
        sbmBtn.click()
})

sbmBtn.addEventListener("click", () => {
    if(!msgInput.value)
        return false
    socket.emit("message-send", JSON.stringify({text: msgInput.value, owner: currentUser}))
    msgInput.value = ""
    return true
})

socket.on("connection", e=>{
    console.log("connected, e")
})
socket.on("message", e => {
    const {text, owner} = JSON.parse(e)
    new Message(text, owner).render()
})