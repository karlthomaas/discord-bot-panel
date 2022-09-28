export default async function handler(req, res){

    const channelFetch = await fetch(process.env.DISCORD_API_BASE_URL + `/channels/${req.query.channel_id}`,{
        method: "get",
        headers: { Authorization: `Bot ${process.env.TOKEN}`},
    })

    if (channelFetch.status === 200){
        const channel = await channelFetch.json()
        res.status(200).json({response: channel})
        return;
    }  else {
        console.log(channelFetch)
        res.status(channelFetch.status).json({response: channelFetch.statusText})
    }
}