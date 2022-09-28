const Serverinfo = ({currentGuild, currentChannel}) => {
    console.log("🚀 ~ file: info.tsx ~ line 2 ~ Serverinfo ~ currentChannel", currentChannel)
    console.log("🚀 ~ file: info.tsx ~ line 2 ~ Serverinfo ~ currentGuild", currentGuild)

    if (currentChannel.response.length !== 0){
        var css= "w-56"
        var channel_jsx = (
                <ul>
                    <li className={css}>Name: {currentChannel.response.name}</li>
                    <li className={css}>ID: {currentChannel.response.id}</li>
                    <li className={css}>Topic: {currentChannel.response.topic == undefined ? "Not set": currentChannel.response.topic}</li>
                    <li className={css}>NSFW: {currentChannel.response.nsfw == true ? "True": "False"}</li>
                </ul>)

    } else {
        var channel_jsx = (<div>Missing Access</div>)
    }

    if (currentGuild !== undefined){
        var guild_jsx =(
            <ul className="">
                <li>Name: {currentGuild.name}</li>
                <li>ID: {currentGuild.id}</li>
            </ul>
        )
    } else {
        var guild_jsx = (<div>Missing access</div>)
    }

    return (
        <div className="server-info-bar ">
            <div className="mt-3 ml-3 break-all">
                <h1>Guild:</h1>
                {guild_jsx}
            </div>
            <div className="mt-3 ml-3 text-sm">
                <h1>Channel:</h1>
                {channel_jsx}
            </div>
            
        </div>
    )
}

export default Serverinfo; 