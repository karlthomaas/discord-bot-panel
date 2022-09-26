
export default async function handler(req, res){
    const channel_id = req.query.channel_id
    console.log(req.query)
    const fetchMessages= await fetch(process.env.DISCORD_API_BASE_URL + `/channels/${channel_id}/messages`, {
        method: "get",
        headers: { Authorization: `Bot ${process.env.TOKEN}`},
    })

    if (fetchMessages.status === 200){
        const messages = await fetchMessages.json()
        res.status(200).json({ response: messages})
    } else{
        res.status(fetchMessages.status).json({ response: fetchMessages.statusText})
    }
}