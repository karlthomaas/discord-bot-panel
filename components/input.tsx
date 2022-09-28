import { useRef }  from "react"

const MessageInput = ({channel_name, channel_id}) => {
    var input_content: string;
    const onChange = event => {
        input_content = event.target.value
    }
    const handleSubmit = event => {
        event.preventDefault();
        fetch(process.env.NEXT_PUBLIC_WEBPAGE_BASE_URL + `/api/sendMessage/${channel_id}`, {
            method: "post",
            body: new URLSearchParams({
                content: input_content,
            })
        })
        document.getElementById("message_form").reset();
    }
    // action={`/api/sendMessage/${channel_id}`}

    if (channel_id === 0 ){
        return(
            <form id="message_form" >
          <input className="content-input" id="message"
          type="text" autoComplete="off" disabled placeholder={`You do not have access to #${channel_name}!`}
          onChange={onChange}></input>
        </form>
        )

    } else {
    return(
        <form  onSubmit={handleSubmit} id="message_form" >
          <input className="content-input" id="message"
          type="text" autoComplete="off" placeholder={`Message #${channel_name}`}
          onChange={onChange}></input>
        </form>
    )}
}

export default MessageInput