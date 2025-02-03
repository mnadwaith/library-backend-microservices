import { Server } from 'socket.io'
import dotenv from 'dotenv'


dotenv.config()

const io = new Server(process.env.PORT,
    {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

io.on('connection', (socket) => {
    console.log("New client connected")

    //Event when a new book or author is created
    socket.on("newBookorAuthor", (data) => {
        console.log("Received new book/author event:", data)

        //Send the notification
        io.emit("newBookOrAuthor", data)
    })

    //Event when a new book or author is created
    socket.on("reviewOrRatingChange", (data) => {
        console.log("Received review/rating event:", data)

        //Send the notification
        io.emit("reviewOrRatingChange", data)
    })

    socket.on('disconnect', () => {
        console.log("Client disconnected")
    })
})