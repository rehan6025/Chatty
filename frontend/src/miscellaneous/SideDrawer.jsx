import { Button, Text, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import magnifyingGlass from "../assets/magnifying-glass-solid.svg";
import { ChatState } from "../context/ChatContext";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user } = ChatState();

  return (
    <>
      <header className="flex justify-between items-center bg-white w-full p-2 border-4">
        {/* Search Button */}
        <div className="group relative">
          <button
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            // onClick={onOpen}
          >
            <i className="fas fa-search"></i>
            <span className="hidden md:inline ml-4">Search User</span>
          </button>
          <span className="absolute hidden group-hover:block bottom-full mb-2 right-0 px-2 py-1 text-sm text-white bg-gray-800 rounded">
            Search Users to chat
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-sans">Chatty</h1>

        {/* Notification and User Menu */}
        <div className="flex items-center space-x-2">
          {/* Notification Dropdown */}
          <div className="relative group">
            <button className="relative p-1">
              {/* <NotificationBadge count={notification.length} /> */}
              <i className="fas fa-bell text-2xl"></i>
            </button>
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg hidden group-hover:block">
              <div className="p-2">
                {/* {!notification.length && <div>No New Messages</div>}
                {notification.map((notif) => (
                  <div
                    key={notif._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${getSender(user, notif.chat.users)}`}
                  </div>
                ))} */}
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center bg-white p-1 rounded">
              <img
                src={user.pic || "https://via.placeholder.com/30"}
                alt={user.name}
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              <i className="fas fa-chevron-down ml-2"></i>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden group-hover:block">
              {/* <ProfileModal user={user}>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">
                  My Profile
                </div>
              </ProfileModal> */}
              <hr />
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                // onClick={logoutHandler}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <div className={`fixed inset-0 z-50 `}>
        <div
          className="fixed inset-0 bg-black opacity-50"
          // onClick={onClose}
        ></div>
        <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Search Users</h2>
          </div>
          <div className="p-4">
            <div className="flex pb-2">
              <input
                type="text"
                placeholder="Search by name or email"
                className="flex-1 p-2 border rounded mr-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                // onClick={handleSearch}
              >
                Go
              </button>
            </div>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && (
              <div className="flex justify-center">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
