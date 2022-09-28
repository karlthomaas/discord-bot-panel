import { FaRegUserCircle } from "react-icons/fa";
import Image from 'next/image'
import MessageInput from "./input";

const Chatbar = ({payload, newMessage}) => {
  if (newMessage !== null) {
    payload.response.unshift(newMessage)
  }
  const messages = payload.response
  console.log("💸 ~ file: chat.tsx ~ line 10 ~ Chatbar ~ messages", messages)
  const channel_id = payload.channel_id
  const channel_name = payload.channel_name
  
  return (
    <div className="content-container">
      <div className="absolute bottom-[70px] pb-15 left-200 w-[100%] h-[100%] overflow-y-auto flex flex-col-reverse scrollbar">
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
      
        {/* <form action={`/api/sendMessage/${channel_id}`} method="post" target="_blank" id="message_form">
          <input className="content-input" id="message" type="text" placeholder={`Message #${channel_name}`}></input>
        </form> */}
    </div>
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
