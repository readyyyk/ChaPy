const PORT = process.env.PORT || 3000

const path = require("path")
const express = require("express")
const expApp = express()
expApp.use(require("cors")())
expApp.use(express.static(path.join(__dirname, 'public')))
const httpApp = require("http").Server(expApp)
const io = require("socket.io")(httpApp);

const chats = new Map()

expApp.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})
expApp.get("/newchat", (req, res) => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const newChat = Array(5).fill(undefined).reduce(prev=>prev+letters.at(Math.floor(Math.random()*letters.length)), "")
    chats.set(newChat, new Set(req.ip))
    console.log(`\nnew chat => chats[${newChat}] = new Set(${req.ip})`)
    res.redirect(`/${newChat}`)
})
expApp.get("/:chat", (req, res) => {
    if(!chats.has(req.params.chat)){
        res.redirect("/")
        console.log("\nredirecting on /")
        return
    }
    console.log(`\nhandling chat of ${req.params.chat}`)

    res.sendFile(path.join(__dirname, 'public', 'chat.html'))
})

io.on("connection", (socket) => {
    console.log(`\ns ->\tconnecting to socket`);
    socket.on("\ns ->\ttrying-to-connect", (e) => {
            console.log("trying", e)
        }
    )

    socket.on("message-send", (e) => {
        const {text, owner} = JSON.parse(e)
        console.log(`\ns ->\tserver received message "${text}" from "${owner}"`)

        socket.broadcast.emit("message", e)
        socket.emit("message", e)
    })
})

httpApp.listen(PORT, ()=>console.log(`listening on ${PORT}\n!!! CHANGE HOST IN chat.html !!!`))
