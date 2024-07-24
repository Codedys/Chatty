import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const { currentUser} = useUserStore();
  const { chatId,user} = useChatStore();
  const endRef = useRef(null)

  useEffect (()=>{
    endRef.current?.scrollIntoView({behavior:"smooth"})
  },[])

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats",chatId),(res)=>{
      setChat(res.data())

    })

    return ()=>{
      unSub()
    }
  },[chatId])


  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  const handleSend = async ()=>{
    if(text === "") return;

    try {
      await updateDoc(doc(db,"chats",chatId),{
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt:new Date(),
        })
      })
      
     const userIDs = [currentUser.id,user.id];

     userIDs.forEach (async( id)=>{

       
       const userChatRef = doc(db,"userchats",id)
       const userChatSnapshot = await getDoc(userChatRef)
       
       if(userChatSnapshot.exists()){
         const userChatsData = userChatSnapshot.data()

         const chatIndex = userChatsData.chats.findIndex((c)=> c.chatId === chatId)
         
         userChatsData.chats[chatIndex].lastMessage = text
         userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true: false  
         userChatsData.chats[chatIndex].updatedAt = Date.now()
         
         
         
         await updateDoc(userChatRef,{
           chats:userChatsData.chats,
           
          })
          
        }
        
      })
    } catch (error) {
      console.log(error)
      
    }

  }

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <span>Jhon Doe</span>
            <p>my name is Jhon</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map(message=>(

          <div className="message own" key={message.createdAt}>
          <div className="text">
            { message.img && <img src={message.img} alt="" />}

            <p>{message.text}</p>
            <span></span>
          </div>
        </div>
        ))}
      
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((open) => !open)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button  onClick={handleSend} className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
