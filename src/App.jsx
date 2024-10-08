import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  const [smallScreen, setSmallScreen] = useState(false);
  const [displayChat, setDisplayChat] = useState(false);
  const [displayDetail, setDisplayDetail] = useState(false);

  const isFirstRender = useRef(true);

  const toggleChat = () => {
    setDisplayChat((previous) => !previous);
  };
  const toggleDetail = () => {
    setDisplayDetail((previous) => !previous);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth <= 768;
      if (isFirstRender.current) {
        if (isSmall) {
          setSmallScreen(true);
        }
        isFirstRender.current = false;
      } else {
        setSmallScreen(isSmall);
      }
    };

    window.addEventListener("resize", checkScreenSize);

    checkScreenSize();

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          {smallScreen ? (
            <>
              {displayChat ? (
                <>
                  {displayDetail
                    ? chatId && <Detail toggleDetail={toggleDetail} />
                    : chatId && (
                        <Chat change={toggleChat} toggleDetail={toggleDetail} />
                      )}
                </>
              ) : (
                <List change={toggleChat} />
              )}
            </>
          ) : (
            <>
              <List />
              {chatId && <Chat />}
              {chatId && <Detail />}
            </>
          )}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
