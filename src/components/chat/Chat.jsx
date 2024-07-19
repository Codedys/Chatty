import { useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

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
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <p>lord enlighten the quick brown fox jumped over me</p>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text">
            <p>lord enlighten the quick brown fox jumped over me</p>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <p>lord enlighten the quick brown fox jumped over me</p>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text">
            <img src="./avatar.png" alt="" />

            <p>lord enlighten the quick brown fox jumped over me</p>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <p>lord enlighten the quick brown fox jumped over me</p>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text">
            <p>lord enlighten the quick brown fox jumped over me</p>
            <span>2 min ago</span>
          </div>
        </div>
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
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
