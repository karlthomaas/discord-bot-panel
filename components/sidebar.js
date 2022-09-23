import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { FiMessageCircle } from "react-icons/fi";

import Image from 'next/image'

const Sidebar = ({ guilds }) => {
    console.log("🚀 ~ file: sidebar.js ~ line 6 ~ Sidebar ~ guilds", guilds)
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
            { guilds.map((data, id) => {
                const guild_icon = data.icon == null ? null: `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.webp?size=96`
                return(<SideBarIcon key={id} guild_icon={guild_icon} name={data.name}/>)
            })
            }
        </div>
    )
}


const SideBarIcon = ({ name, guild_icon}) => (
    <div className="sidebar-icon group">
    {/* <img src={icon} alt={name}/> */}{console.log(guild_icon)}
    
    {guild_icon == null ? <FiMessageCircle size="20"/>: <Image className="rounded-full" src={guild_icon} alt={name} width={100} height={100}/>}
    
      <span class="sidebar-tooltip group-hover:scale-100">
        {name}
      </span>
    </div>
  );

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar