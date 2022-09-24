import Sidebar from "../components/sidebar";
import Channelbar from "../components/channels";
import Serverinfo from "../components/info";
import Chatbar from "../components/chat";

export default function Panel( {  status, guilds } ){
    if (status !== 200 ) {
        return <h1>Error {status}</h1>
    }
    return (<>
    <div className="flex">
        <Sidebar guilds={guilds}/>
        <Channelbar guild={guilds[0]}/>
        <Chatbar/>
        <Serverinfo/>
    </div>
    </>)
} 


export async function getServerSideProps(context){
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
    return {
        props : { status, guilds }
    }
}