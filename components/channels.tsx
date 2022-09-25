import { ImVolumeMedium } from "react-icons/im"
import { BiHash } from "react-icons/bi"

export function Channelbar({ guild, channels }) {
    /* 
    Channels and their type ID's from Discord API
    ---------------------------------------------
    Text Channel - 0
    Voice Channel - 2
    Category - 4

    */
    return(
        <div className="channelbar">
            <div className="pl-6 mt-3 mb-3 text-white font-medium">{guild.name}</div>
                <Divider/>
            <div className="flex flex-col h-screen overflow-y-auto scrollbar">
                { channels.response.map((data, id: number) => {
                    return <Channel key={id} type={data.type} name={data.name}/>
                })}
                <Channel type={0} name="Tekstkan asdasd asd asd asal 1"/>
                <Channel type={2} name="Helikanal 1"/>
            </div>
        </div>
    )
}

export default Channelbar;


const Divider = () => <hr className="w-full h-0.5 ml-0 bg-gray-900"></hr>

const Channel = ({type, name}) => {

    if (type == 2){
        // Voice Channel
    return (
        <div className="channel">
            <div className="pt-1"><ImVolumeMedium size={20}/></div>
            <div className="ml-1  whitespace-nowrap overflow-hidden">{name}</div>
        </div>
    )
} else if (type == 0){
    // Text Channel
    return (
        <div className="channel">
            <div className="pt-1"><BiHash size={20}/></div>
            <div className="ml-1 whitespace-nowrap overflow-hidden">{name}</div>
        </div>
    )
    // asd
} else if (type ==4){
    // asd
}
}
