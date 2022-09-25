export default async function handler(req, res){
    const guild_id = req.query.guild_id
    console.log("🚀 ~ file: [guild_id].tsx ~ line 3 ~ handler ~ guild_id", guild_id)

    let isnum = /^\d+$/.test(guild_id); // retruns true if string has only numbers

    if (!isnum){
        res.status(401).json({response: "Invalid Guild ID"})
        return
    }
    
    // Fetches Discord API
    const fetchChannels = await fetch(process.env.DISCORD_API_BASE_URL + `/guilds/${guild_id}/channels`,{
        method: "get",
        headers: { Authorization: `Bot ${process.env.TOKEN}`}
    })

    if (fetchChannels.status === 200){
        const Channels = await fetchChannels.json()
        res.status(200).json({ response: Channels})

    } else {
        res.status(fetchChannels.status).json({ response: fetchChannels.statusText})
    }

}