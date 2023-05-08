const PORT = process.env.PORT || 3000

const path = require("path")
const express = require("express")
const expApp = express()
const corsAllOrigins = require("cors")({origin: true})
expApp.use(corsAllOrigins)
expApp.use(express.static(path.join(__dirname, 'public')))
const httpApp = require("http").Server(expApp)
const io = require("socket.io")(httpApp, {
    cors: {
        origin: "*",
        credentials: true
    }
});

const chats = new Map()

expApp.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})
expApp.get("/newchat", (req, res) => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const newChat = Array(5).fill(undefined).reduce(prev=>prev+letters.at(Math.floor(Math.random()*letters.length)), "")
    chats.set(newChat, new Set())
    console.log(`\n ---> new chat chats[${newChat}], inited by ${req.ip}`)
    res.redirect(`/${newChat}`)
})
expApp.get("/:chat", (req, res) => {
    if(!chats.has(req.params.chat)){
        res.sendFile(path.join(__dirname, 'public', '404.html'))
        return
    }

    res.sendFile(path.join(__dirname, 'public', 'chat.html'))
})
expApp.get("/:chat/check", (req, res) => {
    const absUrl = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
    res.statusCode = chats.get(req.params.chat).has(absUrl.searchParams.get("name"))?401:200
    res.send()
})

io.on("connection", (socket) => {
    console.log(`\ns ->\tconnecting to socket`);

    let clientName = ""
    socket.on("trying-to-connect", (chat) => {
        socket.join(chat)
        socket.to(chat).emit("client-trying-to-connect")
    })

    socket.on("user-connect", ([chat, user]) => {
        if(chats.get(chat).has(user)){
            socket.emit("client-user-already-exists")
            return
        }
        clientName = user
        chats.set(chat, chats.get(chat).add(user))
        socket.to(chat).emit("client-user-connect", user)
        socket.emit("client-user-connect", user)
    })

    socket.on("message", ([text, owner, chat]) => {
        socket.to(chat).emit("client-message", [text, owner])
        socket.emit("client-message", [text, owner])
    })

    socket.on("disconnecting", () => {
        const chat = [...socket.rooms].pop()
        if(io.sockets.adapter.rooms.get(chat)?.size === 1) {
            console.log(`\n -x-> removed chat chats[${chat}]`)
            chats.delete(chat)
            return
        }

        socket.to(chat).emit("user-disconnect", clientName)
    })
})

httpApp.listen(PORT, ()=>console.log(`listening on ${PORT}\n!!! CHANGE HOST IN chat.html ('<UR IP>') !!!`))
