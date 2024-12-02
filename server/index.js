import express from 'express'
import { Server as SocketServer} from 'socket.io';
import morgan from 'morgan'
import http from 'http'
import cors from 'cors'
import { PORT } from './config.js'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server,{
    cors:{
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ["GET","POST"]
    }
})

app.use(cors())
app.use(morgan("dev"));

io.on('connection', (socket)=>{
    console.log(`Usuario actual : ${socket.id}`)

    socket.on("join_room",(data)=> {
        socket.join(data)
        console.log(`Usuario con id: ${socket.id} se ha unido a la sala: ${data}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit('message',data)
        console.log(data)
    })
    
    socket.on("disconnect", () => {
        console.log(` Se ha desconectado: ${socket.id} `);
    });

})

server.listen(PORT)
console.log('Server iniciado en port',PORT)
