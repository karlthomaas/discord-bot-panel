import { FiMessageCircle } from "react-icons/fi";
import Image from 'next/image'

const Sidebar = ({ guilds, changeGuild }) => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
            { guilds.map((data, id: number) => {
                const guild_icon = data.icon == null ? null: `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.webp?size=96`
                return(<SideBarIcon key={id} guild_icon={guild_icon} data={data} changeGuild={changeGuild}/>)})
            }
        </div>
    )
}

const SideBarIcon = ({ guild_icon, data, changeGuild}) => {

  return (
    <div className="sidebar-icon group">
    {guild_icon == null ? <FiMessageCircle size="20"/>: <a onClick={() => changeGuild(data)}><Image className="sidebar-icon" src={guild_icon} alt={data.name} width={100} height={100}/></a>}
      <span className="sidebar-tooltip group-hover:scale-100">
        {data.name}
      </span>
    </div>
  )
};

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar