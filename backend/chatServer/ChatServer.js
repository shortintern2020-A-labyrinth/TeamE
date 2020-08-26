const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const { generateMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 4000

io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    console.log(`Connected: ${socket.id}`);

    socket.on('join', (options, callback) => {
        
        const { error, user } = addUser({ id: socket.id, ...options })
        console.log(`Socket ${socket.id} joining`);
        if (error) {
            return callback(error)
        }

        socket.join(user.room);

        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        socket.emit('messageLocal', generateMessage(user.username, message));
        socket.broadcast.to(user.room).emit('message', generateMessage(user.username, message));
        console.log("send msg from server");
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        console.log(`Disconnected: ${socket.id}`);

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})