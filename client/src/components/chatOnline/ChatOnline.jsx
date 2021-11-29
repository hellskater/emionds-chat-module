import axios from "axios";
import { useEffect, useState } from "react";
import "./ChatOnline.scss";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [onlineFriends, setOnlineFriends] = useState(onlineUsers);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(currentId);

  useEffect(() => {
    setOnlineFriends(onlineUsers.filter((f) => f.userId !== currentId));
  }, [currentId, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user.userId}`
      );
      console.log(res);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          key={o.userId}
          className="chatOnlineFriend"
          onClick={() => handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.userId}</span>
        </div>
      ))}
    </div>
  );
}
