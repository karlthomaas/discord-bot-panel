import { FiMessageCircle } from "react-icons/fi";
import Image from 'next/image'

const Sidebar = ({ guilds, changeGuild }) => {

    return (
        <div className="fixed top-0 left-0 h-screen w-16  m-0 flex flex-col flex-none bg-gray-900 text-white shadow-lg">
            { guilds.map((data, id: number) => {
                const guild_icon = data.icon == null ? null: `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.webp?size=96`
                return(<SideBarIcon key={id} guild_icon={guild_icon} data={data} changeGuild={changeGuild}/>)})
            }
        </div>
    )
}

const SideBarIcon = ({ guild_icon, data, changeGuild}) => {

  return (
    <div className="group sidebar-group">
    {guild_icon == null ? <a className="sidebar-icon"  onClick={() => changeGuild(data)}><FiMessageCircle size="20"/></a>: <a onClick={() => changeGuild(data)}><Image className="sidebar-icon" src={guild_icon} alt={data.name} width={50} height={50}/></a>}
      <span className="sidebar-tooltip group-hover:scale-100">
        {data.name}
      </span>
    </div>
  )
};

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar