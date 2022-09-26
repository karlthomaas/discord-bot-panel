
export default async function handler(req, res) {
    const channel_id = req.query.channel_id
    const message = req.body.content

    if (message == undefined){
        // asd
        res.json({response: "undefined"})
        return

    }

    if (message.length > 2000){
        res.json({response: "Message exceeds 2000 char limit"})
        return
    }

    const sendMessage = await fetch(process.env.DISCORD_API_BASE_URL + `/channels/${channel_id}/messages`,{
        method: "post",
        headers: { Authorization: `Bot ${process.env.TOKEN}`},
        body: new URLSearchParams({
            content: message,
        })
        
    })
    const messageRes = await sendMessage.json()
    res.status(200).json(messageRes)
  }
  