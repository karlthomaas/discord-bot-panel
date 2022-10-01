import { FaRegUserCircle } from "react-icons/fa";
import { BiHash } from "react-icons/bi"
import Image from 'next/image'
import MessageInput from "./input";

const Chatbar = ({payload, newMessage}) => {
  if (newMessage !== null) {
    payload.response.unshift(newMessage)
  }
  const messages = payload.response
  const channel_id = payload.channel_id
  const channel_name = payload.channel_name
  
  return (
    <>
    <div className="w-[100%] min-w-[720px] mr-1">
      <div className="overflow-y-scroll flex flex-none flex-col-reverse scrollbar h-[calc(100vh_-_100px)] pr-10 ">
        { messages !== "Forbidden" &&
          messages.length > 0 &&
          messages.map((data, id:number) => {
            return <Message 
            key={id} content={data.content} author={data.author.username} author_id={data.author.id}
            author_icon={data.author.avatar} type={data.type} timestamp={data.timestamp}
            />
            })}
      </div>
      { messages !== "Forbidden" ? <MessageInput channel_name={channel_name} channel_id={channel_id}/> : <MessageInput channel_name={"Error"} channel_id={0}/>}
    </div>
    </>
  );
}
export default Chatbar;

const Message = ({ author, author_icon, content, type, timestamp,  author_id}) => {
  const date = new Date(timestamp)
  const icon_url = `https://cdn.discordapp.com/avatars/${author_id}/${author_icon}.png?size=1024`

  return (
    <div className="message-container">
      <div className="px-5 pt-2">
        { author_icon == null ? <FaRegUserCircle size={30} /> : <Image src={icon_url} alt={author} height={50} width={50} className="rounded-full"></Image>}
      </div>
      <div className="message-data">
        <div className="message-info">
        {author} | {`${date.toUTCString()}`}
        </div>
        <div className="message-content">
        {content.length == 0 ? "<embed/component>" : content}
        </div>
      </div>
    </div>
  );
};
