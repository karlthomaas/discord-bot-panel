import { Server } from 'Socket.IO'
const WebSocket = require('ws')

export default function SocketHandler(req, res){

  if (res.socket.server.io){
    // if socket connection is already created
    console.log('Socket connection already set up!')
  
    res.end();
    return;
  } else {

  const io = new Server(res.socket.server)
  res.socket.server.io = io;

  io.on("connection", socket =>{
    emitDiscordMessage(socket, io)
  })
  
}
res.end();
}

function emitDiscordMessage(socket, io){
  const ws = new WebSocket('wss://gateway.discord.gg/?v=6&encoding=json')
  let interval = 0;
  var s_sequence;
  let token = process.env.TOKEN

  let payload = {
    // payload vajalik enda tuvastamiseks | (identify structure)
    
        op:2,
        d: {
            // inner data object 
            token: token,
            intents: 513,
            properties:{
                // connection properies ->
                os:"windows", // your operating system
                browser:"chrome", // your library name
                device:"chrome", // your library name
            }
    
        }
    }
    
    const heartbeat = (ms) => {
      return setInterval(() => {
          ws.send(JSON.stringify({op:1, d:s_sequence}))
      }, ms)
  }

  ws.on('open', function open(){
    // Triggers the initial handshake with the gateaway
    // Sends identify obj to the gateaway
    ws.send(JSON.stringify(payload))
  })

  ws.on('message', function incoming(data){
    let payload = JSON.parse(data)
    const { t, event, s, op, d } = payload;
    s_sequence = s
    switch (op){
        case 10:
            // Discord sends  Hello 10 event (containing heartbeat interval)
            // Pings are used to let Discord know were still using Gateaway connection
            const { heartbeat_interval } = d;
            console.log(heartbeat_interval)
            let interval = heartbeat(heartbeat_interval)
            break;

    }

    switch(t){
        case 'MESSAGE_CREATE':
            let author = d.author.username
            let content = d.content
            console.log(`${author}: ${content}`)
            socket.emit('newMessage', d)
    }
})
}