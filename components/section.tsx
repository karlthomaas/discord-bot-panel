import { BiHash } from "react-icons/bi"
import { AiFillQuestionCircle, AiFillPushpin, AiOutlineSearch } from "react-icons/ai"
import { MdInbox } from "react-icons/md"
import { FiUsers } from "react-icons/fi"
import { BsFillBellFill } from "react-icons/bs"
import {RiChatQuoteLine} from "react-icons/ri"

const Section = ({ currentChannel }) => {
    console.log("🚀 ~ file: section.tsx ~ line 9 ~ Section ~ currentChannel", currentChannel)
    const buttons_class = 'hover:text-white hover:cursor-pointer'
    const button_size = 24
    return (
    <div className="w-[100%] h-[50px] bg-gray-25 flex whitespace-nowrap pl-5 pt-3 border-b-2 border-gray-900">

        <div id="channel-information" className="flex">
            <BiHash className="text-gray-10" size={30}/>
            <div className="text-white text-lg font-bold pl-2">{currentChannel.response.name == undefined ? "Unknown" : currentChannel.response.name}</div>
        </div>
        <div id="media-buttons" className="flex space-x-4 ml-auto mr-5 text-gray-10">
            <RiChatQuoteLine className={buttons_class} size={button_size} />
            <BsFillBellFill className={buttons_class} size={button_size} />
            <AiFillPushpin className={buttons_class} size={button_size} />
            <FiUsers className={buttons_class} size={button_size} />
            <div className="w-40 hover:w-52 transition-all h-6  rounded-sm bg-gray-900 text-gray-10 font-semibold flex cursor-text">
                <p className="self-center pl-1">Search</p>
                <AiOutlineSearch className="self-center ml-auto mr-1" size={17}/>
            </div>
            <MdInbox className={buttons_class} size={button_size} />
            <AiFillQuestionCircle className={buttons_class}size={button_size} />
        </div>

    </div>
    )
}

export default Section;