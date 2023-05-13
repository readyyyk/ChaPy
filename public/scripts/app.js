const
    host = "localhost:3000",
    currentChat = document.location.pathname.slice(1),
    socket = io(host)

let currentUser = "test"

socket.emit("trying-to-connect", currentChat)

const toast = new bootstrap.Toast(document.querySelector("#toast"))
const modal = new bootstrap.Modal(document.querySelector('#modal'))
modal.show()

socket.on("client-trying-to-connect", () => {
    bootstrap.Toast.getOrCreateInstance(document.querySelector("#toast")).show()
})

const form = document.forms[0]
form.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(document.location + `/check?name=${encodeURIComponent(form.uname.value)}`)
        .then(data => {
            if (data.ok) {
                currentUser = form.uname.value
                fetch(document.location + `/users`)
                    .then(res => {
                        console.log(res)
                        return res.json()
                    })
                    .then(data => {
                        console.log(data)
                        data?.forEach(el => new UserListEl(el).render())
                    })
                socket.emit("user-connect", currentUser)
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
        this.isThisUser = this.owner === currentUser
    }

    render() {
        const el = document.createElement("div")

        el.classList.add("container-fluid", "d-flex", `justify-content-${this.type === "msg" ? this.isThisUser ? "end" : "start" : "center"}`, "px-0", "message",
            this.isThisUser ? "message-y" : "message-ny")
        el.innerHTML = `
        <div style="max-width: 90%;" class="d-flex align-items-center flex-row${this.isThisUser ? "-reverse" : ""}">
            ${this.type === "msg" ?
            `<div class="d-flex flex-column align-items-center user__info">
                <img src="http://167.172.179.35:3001/render?seed=${encodeURIComponent(this.owner)}" alt=""
                     class="rounded mx-2 mx-md-4">
                <span> ${this.owner} </span>
            </div>` : ""}
            <div class="text-brake ${this.isThisUser ? "bg-primary" : "bg-secondary"} rounded p-3 py-2 ${this.type !== "msg" ? "py-1 rounded-pill" : ""}" style="--bs-bg-opacity: 0.4">
                ${this.text}
            </div>
        </div>
        `
        msgContainer.append(el)
        return this
    }
    notify(text){
        if(!this.isThisUser && this.owner && !document.hasFocus())
            notificationsApi.notification(this.owner, this.text, hashMapApi.link(this.owner))
        if(this.owner === null && !document.hasFocus())
            notificationsApi.notification("ChatBin", text, `${document.location.toString().slice(0,document.location.toString().lastIndexOf("/"))}/imgs/favicon.svg`)
        return this
    }
}

const uListContainer = document.querySelector("#user-list")
let currentListState = "none"
class UserListEl {
    constructor(name) {
        this.name = name
    }
    render() {
        const el = document.createElement("div")
        el.id = `${this.name}`
        el.classList.add("d-flex", "justify-content-end", "align-items-center")
        el.innerHTML = `
    <span class="pe-2" style="display: ${currentListState}"> ${this.name} </span>
    <img src="http://167.172.179.35:3001/render?seed=${encodeURIComponent(this.name)}"
        alt="${this.name}"
        class="rounded rounded-circle bg-light my-1">
    `
        uListContainer.append(el)
        return this
    }
}
document.querySelector("#user-list").addEventListener("click", () => {
    currentListState = currentListState === "none" ? "inline" : "none"
    document.querySelectorAll("#user-list span").forEach(el => el.style.display = currentListState)
})

window.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        sbmBtn.click()
})

sbmBtn.addEventListener("click", () => {
    if (!msgInput.value)
        return false
    socket.emit("message", [msgInput.value, currentUser])
    msgInput.value = ""
    return true
})

socket.on("client-message", ([text, owner]) => {
    new Message(text, owner).render().notify()
})
socket.on("user-disconnect", (e) => {
    new Message(`<u><b>${e}</b></u>
<img src="http://167.172.179.35:3001/render?seed=${encodeURIComponent(e)}" alt="" class="mx-2" height="24px" width="24px"> disconnected`,
        null, "connection").render().notify(`${e} disconnected`)

    document.querySelector(`#user-list #${e}`).remove()
})
socket.on("client-user-connect", (e) => {
    toast.hide()
    new Message(`<u><b>${e}</b></u>
<img src="http://167.172.179.35:3001/render?seed=${encodeURIComponent(e)}" alt="" class="mx-2" height="24px" width="24px"> connected`,
        null, "connection").render().notify(`${e} connected`)
    if (e !== currentUser)
        new UserListEl(e).render()
})
socket.on("client-user-already-exists", e => {
    modal.show()
})