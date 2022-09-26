import Sidebar from "../components/sidebar";
import Channelbar from "../components/channels";
import Serverinfo from "../components/info";
import Chatbar from "../components/chat";
import { useState } from "react";

export default function Panel({ status, guilds, channels }) {
  const [currentGuild, setCurrentGuild] = useState(guilds[0]);
  const [currentChannels, setCurrentChannels] = useState(channels);
  const [currentMessages, setCurrentMessages] = useState({ response: [], channel_id: [], channel_name:[]})

  function changeGuild(guild) {
    console.log('Click', guild)

    // Fetches Channels from that guild
    fetch (process.env.NEXT_PUBLIC_WEBPAGE_BASE_URL + `/api/getChannels/${guild.id}`)
    .then( (response) =>  response.json())
    .then((channels) => {
        console.log("🚀 ~ file: panel.tsx ~ line 18 ~ .then ~ channels", channels)
        // todo Check if channels are valid (error messages.. etc)
        setCurrentGuild(guild);
        setCurrentChannels(channels)
      })
  }

  function loadMessages(channel_id: string, channel_name:string){
    console.log('Loading ' + channel_id + ' messages')
    fetch(process.env.NEXT_PUBLIC_WEBPAGE_BASE_URL + `/api/getMessages/${channel_id}`)
    .then((response) => response.json())
    .then((channels) => {
      channels["channel_id"] = channel_id
      channels["channel_name"] = channel_name
      setCurrentMessages(channels)
    })
  }

  if (status !== 200) {
    return <h1>Error {status}</h1>;
  }

  return (
    <>
      <div className="flex ">
        <Sidebar guilds={guilds} changeGuild={changeGuild} />
        <Channelbar guild={currentGuild} channels={currentChannels} loadMessages={loadMessages} />
        <Chatbar payload={currentMessages}/>
        <Serverinfo />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  var status = 200;
  const guildsFetch = await fetch(process.env.DISCORD_API_BASE_URL + `/users/@me/guilds`, {
      // Function which fetches bot Servers
      method: "get",
      headers: { Authorization: `Bot ${process.env.TOKEN}`}
  })

  if (guildsFetch.status !== 200) {
      console.log('Error while fetching bot guilds!')
      console.log(`Error code: ${guildsFetch.status}`)
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
    props: { status, guilds, channels },
  };
}
