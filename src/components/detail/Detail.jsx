import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";

const Detail = ({ toggleDetail }) => {
  const { currentUser } = useUserStore();
  const { chatId, user, changeBlock, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="detail">
      <div className="icon" onClick={() => toggleDetail()}>
        <img src="./left.png" alt="" />
      </div>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet .</p>
      </div>

      <div className="info">
        <div className="options">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="options">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="options">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>

          <div className="photo">
            <div className="photoitem">
              <div className="photodetail">
                <img src="./avatar.png" alt="" />
                <span>Photo_2024_.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoitem">
              <div className="photodetail">
                <img src="./avatar.png" alt="" />
                <span>Photo_2024_.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            
          </div>
        </div>

        <div className="options">
          <div className="title">
            <span>shared files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button onClick={() => auth.signOut()} className="logout">
          logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
