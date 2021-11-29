import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.scss";
import { headers } from "../../headers";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.sub);

    const getUser = async () => {
      try {
        const res = await axios.get(
          `https://${process.env.REACT_APP_OKTA_DOMAIN}/api/v1/users/` +
            friendId,
          headers
        );
        setUser(res.data.profile);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.firstName}</span>
    </div>
  );
}
