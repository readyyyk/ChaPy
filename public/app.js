const
    host = "<UR IP>:3000",
    currentChat = document.location.pathname.slice(1),
    socket = io(host)

let currentUser = "test"

socket.emit("trying-to-connect", currentChat)

const toast = bootstrap.Toast.getOrCreateInstance(document.querySelector("#toast"))
const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modal'))
modal.show()

socket.on("client-trying-to-connect", () => {
    bootstrap.Toast.getOrCreateInstance(document.querySelector("#toast")).show()
})

const form = document.forms[0]
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    fetch(document.location+`/check?name=${encodeURIComponent(form.uname.value)}`)
        .then(data => {
            if(data.ok){
                currentUser = form.uname.value
                socket.emit("user-connect", [document.location.pathname.slice(1), currentUser])
                modal.hide()
            } else {
                document.querySelector("#form-tooltip").classList.remove("hidden")
            }
        })
})

const
    msgContainer = document.querySelector("#msg-container"),
    sbmBtn = document.querySelector("#submit"),
    msgInput = document.querySelector("#text-input")

class Message {
    constructor(text, owner, type) {
        this.type = type || "msg"
        this.text = text
        this.owner = owner
    }
    render(){
        const el = document.createElement("div")
        const isThisUser = this.owner === currentUser
        el.classList.add("container-fluid", "d-flex", `justify-content-${this.type==="msg"?isThisUser?"end":"start":"center"}`, "px-0", "message",
            isThisUser?"message-y":"message-ny")
        el.innerHTML = `
            <div style="max-width: 90%;" class="d-flex align-items-center flex-row${isThisUser?"-reverse":""}">
                ${this.type==="msg" ?
                `<div class="d-flex flex-column align-items-center user__info">
                    <img src="http://167.172.179.35:3001/render?seed=${encodeURIComponent(this.owner)}" alt=""
                         class="rounded mx-2 mx-md-4">
                    <span> ${this.owner} </span>
                </div>` : ""}
                <div class="${isThisUser?"bg-primary":"bg-secondary"} rounded p-3 py-2 ${this.type!=="msg"?"py-1 rounded-pill":""}" style="--bs-bg-opacity: 0.4">
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
    socket.emit("message", [msgInput.value, currentUser, currentChat])
    msgInput.value = ""
    return true
})

socket.on("client-message", ([text, owner]) => {
    new Message(text, owner).render()
})
socket.on("user-disconnect", (e)=>{
    new Message(`<u><b>${e}</b></u>
    <img src="http://167.172.179.35:3001/render?seed=${encodeURIComponent(e)}" alt="" class="mx-2" height="24px" width="24px"> disconnected`,
        null, "connection").render()
})
socket.on("client-user-connect", (e)=>{
    toast.hide()
    new Message(`<u><b>${e}</b></u>
    <img src="http://167.172.179.35:3001/render?seed=${encodeURIComponent(e)}" alt="" class="mx-2" height="24px" width="24px"> connected`,
        null, "connection").render()
})
socket.on("client-user-already-exists", e=>{
    modal.show()
})