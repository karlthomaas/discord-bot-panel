import Sidebar from "../components/sidebar";
import Channelbar from "../components/channels";
import Serverinfo from "../components/info";
import Chatbar from "../components/chat";
import { useEffect, useState, useRef } from "react";
import io from 'Socket.IO-client'
 
let socket;
export default function Panel({ status, guilds, channels, client}) {
  const [currentGuild, setCurrentGuild] = useState(guilds[0]);
  const [currentChannels, setCurrentChannels] = useState(channels);
  const [currentMessages, setCurrentMessages] = useState({ response: [], channel_id: '', channel_name: ''})
  const [currentChannel, setCurrentChannel] = useState({ response: []})
  const [newMessage, setNewMessage] = useState(null)
  
  useEffect(() => {
    socketInitializer();
  }, [])


  const socketInitializer = async () => {
    await fetch("/api/socket")

    socket = io();

    socket.on('connect', () =>{
      console.log('Client side: Connected')
    })

    socket.on('newMessage', (msg) => {
      // executes when new message is being sent
      let current_channel = sessionStorage.getItem('current_channel_id') // Gets current channel from storage
      if (msg.channel_id === current_channel){
        // Checks if message is being sent from the same channel \
        // That the bot is watching
        setNewMessage(msg)
      } else{
      }
    })
  }

  
  
  // s
  function changeGuild(guild) {
    // Fetches Channels from that guild
    fetch (process.env.NEXT_PUBLIC_WEBPAGE_BASE_URL + `/api/getChannels/${guild.id}`)
    .then( (response) =>  response.json())
    .then((channels) => {
        // todo Check if channels are valid (error messages.. etc)
        setCurrentGuild(guild);
        setCurrentChannels(channels)
        // takes the first channel from new guild
        var firstChannel = channels.response[0]

        // 
        loadMessages(firstChannel.id, firstChannel.name)
      })
  }

  function loadMessages(channel_id: string, channel_name:string){
    // Sets new messages
    fetch(process.env.NEXT_PUBLIC_WEBPAGE_BASE_URL + `/api/getMessages/${channel_id}`)
    .then((response) => response.json())
    .then((channels) => {
      channels["channel_id"] = channel_id
      channels["channel_name"] = channel_name
      setCurrentMessages(channels)
      setNewMessage(null)
      window.sessionStorage.setItem('current_channel_id', channels.channel_id)
      
    })
    // Returns Current Channel object
    fetch(process.env.NEXT_PUBLIC_WEBPAGE_BASE_URL + `api/getChannel/${channel_id}`)
    .then((response) => response.json())
    .then((channel) => {
      setCurrentChannel(channel)
    })
  }

  if (status !== 200) {
    return <h1>Error {status}</h1>;
  }

  return (
    <>
      <div className="flex ">
        <Sidebar guilds={guilds} changeGuild={changeGuild} client={client}/>
        <Channelbar guild={currentGuild} channels={currentChannels} loadMessages={loadMessages} />
        <Chatbar payload={currentMessages} newMessage={newMessage}/>
        <Serverinfo currentGuild={currentGuild} currentChannel={currentChannel}/>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {

  const clientFetch = await fetch(process.env.DISCORD_API_BASE_URL + `/users/@me`, {
    method: "get",
      headers: { Authorization: `Bot ${process.env.TOKEN}`}
  })
  const client = await clientFetch.json()

  var status = 200;
  const guildsFetch = await fetch(process.env.DISCORD_API_BASE_URL + `/users/@me/guilds`, {
      // Function which fetches bot Servers
      method: "get",
      headers: { Authorization: `Bot ${process.env.TOKEN}`}
  })
  console.log(guildsFetch)
  if (guildsFetch.status !== 200) {
      console.log('Error while fetching bot guilds!')
      console.log(`Error code: ${guildsFetch.status}`)
      status = guildsFetch.status
      return { props : { status }}
  }

  const guilds = await guildsFetch.json()

  if (guilds.length === 0) {
    console.log('Current bot is not in any server!')
    status = 101 // means bot is not in any server
    return { props : { status }}
  }

  const channelsFetch = await fetch(process.env.NEXT_PUBLIC_WEBPAGE_BASE_URL+ `/api/getChannels/${guilds[0]["id"]}`)
  const channels = await channelsFetch.json()
  
  return {
    props: { status, guilds, channels, client },
  };
}
