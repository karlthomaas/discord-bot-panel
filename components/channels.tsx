import { ImVolumeMedium } from "react-icons/im"
import { BiHash } from "react-icons/bi"
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md"
import { HiMicrophone } from "react-icons/hi"
import { MdHeadset } from "react-icons/md"
import { BsFillGearFill } from "react-icons/bs"

import Image from 'next/image'

export function Channelbar({ guild, channels, client, loadMessages }) {
    /* 
    Channels and their type ID's from Discord API
    ---------------------------------------------
    Text Channel - 0
    Voice Channel - 2
    Category - 4


    Channel object structure ->
    {id: '965165682465570816', type: 4, name: 'Text Channels', position: 0, flags: 0,  id:0, guild_id:0, parent_id:0}
    */
    
    // * Algorithm for sorting the channels ->
    var sorted_channels = { 0: { channels : {}}}
    for (var i = 0; i < channels.length; i++ ){
        var channel = channels[i]
        if (channel.type === 4) {
            // if channel is category
            if (channel.id in sorted_channels){
                // if category item has already been created - by text/vc channels
                sorted_channels[channel.id]["category_name"] = channel.name
                sorted_channels[channel.id]["category_pos"] = channel.position
                continue
            } else {
                // if category hasn't been created yet
                sorted_channels[channel.id] = {category_name: channel.name, category_pos: channel.position, channels:{}}
                continue
            }

        } else if (channel.type === 0 || channel.type === 2){
            // text or voice channel
            if (channel.parent_id == null){
                // if Channel doesn't belong to category
                sorted_channels['0']['channels'][channel.position] = channel
                continue
            } 

            if (channel.parent_id in sorted_channels){
                // if category item has already been created
                sorted_channels[channel.parent_id]['channels'][channel.position] = channel

            } else {
                // if  category item hasn't been created -> Creates one and sets channel
                sorted_channels[channel.parent_id] = {category_name: '', category_pos: '', channels: {}}
                sorted_channels[channel.parent_id]['channels'][channel.position] = channel
            }
        }
    }

    //* <- Algorithm for sorting the channels

    const icon_url = `https://cdn.discordapp.com/avatars/${client.id}/${client.avatar}.png?size=1024`
    const button_css = 'hover:bg-gray-25'
    return(
        <>
        <div className="channelbar">
            
            <div className="pl-6 pt-3 pb-3 text-white font-medium border-b-2 border-gray-900">{guild.name}</div>
            <div className="flex flex-col h-[calc(100vh_-_110px)] overflow-y-auto scrollbar">
            {
                Object.keys(sorted_channels).map((category, index) => {
                    return (
                    Object.keys(sorted_channels[category].channels).map((channel_id, index2) => {
                        return (
                            <Channel key={index2} type={sorted_channels[category]["channels"][channel_id].type} id={sorted_channels[category]["channels"][channel_id].id} name={sorted_channels[category]["channels"][channel_id].name} loadMessages={loadMessages}/>
                        )
                    }))
                })}
            </div>
        </div>

        <div className="w-60 h-14 fixed bottom-0 left-[64px] bg-gray-800 flex text-white">
                <div className="pt-3 pl-3">
                { client.avatar == null ? <FaRegUserCircle size={30} /> : <Image src={icon_url} alt={client.name} height={35} width={35} className="rounded-full"></Image>}
                </div>
                <div className="flex-row pt-2 font-semibold pl-2 text-sm">
                    <p>{client.username}</p>
                    <p className="text-gray-10">Status...</p>

                </div>
                <div className="flex ml-auto mr-3 mt-5 space-x-3">
                    <HiMicrophone className={button_css} size={20}/>
                    <MdHeadset className={button_css} size={20}/>
                    <BsFillGearFill className={button_css} size={20}/>
                </div>

            </div>
        </>
    )
}

export default Channelbar;

const Channel = ({type, id, name, loadMessages}) => {

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
        <div className="channel" onClick={() => loadMessages(id, name)}>
            <div className="pt-1"><BiHash size={20}/></div>
            <div className="ml-1 whitespace-nowrap overflow-hidden">{name}</div>
        </div>
    )
    // asd
} else if (type ==4){
    return (
    <div className="channel">
            <div className="pt-1"><MdKeyboardArrowDown size={20}/></div>
            <div className="ml-1  whitespace-nowrap overflow-hidden">{name}</div>
        </div>
    )
}
}
