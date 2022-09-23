import Sidebar from "../components/sidebar";

export default function Panel( {  status, guilds } ){
    console.log(guilds)
    if (status !== 200 ) {
        return (<h1>Error {status}</h1>)
    }
    return (<>
    <div className="flex">
        <h2></h2>
        <Sidebar guilds={guilds}/>
    </div>
    </>)
} 


export async function getServerSideProps(context){
    var status = 200;

    const guildsFetch = await fetch(process.env.BASE_URL + `/users/@me/guilds`, {
        // Function which fetches bot Servers
        method: "get",
        headers: { Authorization: `Bot ${process.env.TOKEN}`}
    })

    /*
    Returns a dictionary of guilds
    {
        id: '769307240430960710',
        name: 'Singiviilu botid',
        icon: '37ba1fcc1a77287f6c87aa3af9bd69d6',
        owner: false,
        permissions: '1071698660929',
        features: []
    },
    */
        
    if (guildsFetch.status != '200') {
        console.log('Error while fetching bot guilds!')
        console.log(`${guildsFetch.status} ${guildsFetch.message}`)
        return { props : { status }}
    }

    const guilds = await guildsFetch.json()
    // for (const [key, value] of Object.entries(guilds)) {
    //     sortedGuilds["guilds"][value.id] = {"name": value.name, "icon": value.icon}
    // }

    return {
        props : { status, guilds }
    }
}