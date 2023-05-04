const { Server } = require("socket.io");
const http = require("http");

const io = new Server({
    cors: {
        origin: "*",
    }
});
io.on("connection", (socket) => {
    console.log("connecting");
    socket.on("trying-to-connect", (e) => {
            console.log("trying", e)
        }
    )
    }
)

io.listen(3001)