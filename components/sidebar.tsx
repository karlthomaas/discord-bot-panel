import { FiMessageCircle } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import Image from 'next/image'

const Sidebar = ({ guilds, changeGuild, client}) => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col flex-none bg-gray-900 text-white shadow-lg overflow-y-auto no-scrollbar">
          <div id="profile-icon" className="sidebar-icon group mb-2">
            <FaRobot size="20"/>
            <span id="profile" className="sidebar-profile group-hover:scale-100">
              Bot information: <br/>
              Name - {client.username}<br/>
              ID - {client.id} <br/>
              Bot Servers - {guilds.length}
            </span>
          </div>
          <Divider/>
          <div className="mt-2">
            { guilds.map((data, id: number) => {
                const guild_icon = data.icon == null ? null: `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.webp?size=96`
                return(<SideBarIcon key={id} guild_icon={guild_icon} data={data} changeGuild={changeGuild}/>)})
            }
          </div>
        </div>
    )
}

const SideBarIcon = ({ guild_icon, data, changeGuild}) => {

  return (
    <div className="group sidebar-group">
    {guild_icon == null ? <a className="sidebar-icon" onClick={() => changeGuild(data)}><FiMessageCircle size="20"/></a>: <a className="sidebar-icon" onClick={() => changeGuild(data)}><Image className="rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer shadow-lg" src={guild_icon} alt={data.name} width={50} height={50}/></a>}
      <span className="sidebar-tooltip group-hover:scale-100">
        {data.name}
      </span>


    </div>
  )
};

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar