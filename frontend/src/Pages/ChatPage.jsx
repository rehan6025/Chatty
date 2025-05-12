import { ChatState } from "../context/ChatContext";
import ChatBox from "../miscellaneous/ChatBox";
import MyChats from "../miscellaneous/MyChats";
import SideDrawer from "../miscellaneous/SideDrawer";
const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div className="w-full h-screen ">
      {user && <SideDrawer />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "91.5vh",
          padding: "10px",
        }}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </div>
  );
};

export default ChatPage;
