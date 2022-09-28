export default async function handler(req, res){

    const guildFetch = await fetch(process.env.DISCORD_API_BASE_URL + `/guilds/${req.query.guild_id}`,{
        method: "get",
        headers: { Authorization: `Bot ${process.env.TOKEN}`},
    })

    if (guildFetch.status === 200){
        const guild = await guildFetch.json()
        res.status(200).json({response: guild})
        return;
    }  else {
        res.status(guildFetch.status).json({response: "Error"})
    }
}