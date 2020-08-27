import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatPage.module.css";
import moment from "moment";
import GlobalMenu from "../ArtistListPage/GlobalMenu/GlobalMenu";
import ArtistCard from "../ArtistListPage/ArtistCard/ArtistCard";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";

const io = require("socket.io-client");
const socket = io("http://magnusbarata-f41ddc64.localhost.run");

const ChatPage = (props) => {
  const userID = useSelector((state) => {
    return state.user.userID;
  });
  const user = useSelector((state) => {
    return state.user.user;
  });
  const artistID = useSelector((state) => {
    return state.artist.id;
  });
  const artist = useSelector((state) => {
    return state.artist.name;
  });

  // const [text, setText] = useState("");
  // const [username, setUsername] = useState(props.name);
  // const [room, setRoom] = useState(props.room);
  // const [inRoom, setInRoom] = useState(true);
  // const [messages, setMessages] = useState([]);
  // const [usersData, setUsersData] = useState([]);
  // const [flag, setFlag] = useState(false);
  // const history = useHistory();

  const [text, setText] = useState("");
  const [username, setUsername] = useState(userID);
  const [room, setRoom] = useState(artistID);
  const [displayUsername, setDisplayUsername] = useState(user);
  const [displayRoom, setDisplayRoom] = useState(artist);
  const [inRoom, setInRoom] = useState(true);
  const [messages, setMessages] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [flag, setFlag] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (inRoom && !flag) {
      console.log("joining room");
      socket.emit("join", { username, displayUsername, room }, (error) => {
        if (error) {
          alert(error);
          window.location.href = "/";
        }
      });
      setFlag(true);
    }

    return () => {
      if (!inRoom) {
        socket.emit("disconnect");
      }
    };
  });

  useEffect(() => {
    socket.on("message", (sentmessage) => {
      console.log("message from server");
      console.log(sentmessage);

      setMessages((messages) => [
        ...messages,
        {
          name: sentmessage.displayUsername,
          message: sentmessage.text,
          createdAt: moment(sentmessage.createdAt).format("h:mm a"),
          local: false,
        },
      ]);
    });

    socket.on("messageLocal", (sentmessage) => {
      console.log("message Local from server");
      console.log(sentmessage);

      setMessages((messages) => [
        ...messages,
        {
          name: sentmessage.displayUsername,
          message: sentmessage.text,
          createdAt: moment(sentmessage.createdAt).format("h:mm a"),
          local: true,
        },
      ]);
    });

    socket.on("roomData", ({ room, users }) => {
      console.log(users);
      console.log(users.length);

      setUsersData(users.map((user) => user["displayUsername"]));

      setRoom(room);
      console.log(usersData);
    });
  }, []);

  const sendMessage = () => {
    console.log("emitting new message:" + text);
    console.log(usersData);
    const message = text;

    socket.emit("sendMessage", message, (error) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message delivered!");
    });

    setText("");
  };

  const handleMessageChange = (e) => {
    const newValue = e.target.value;
    setText(newValue);
  };

  const useScroll = () => {
    const htmlElRef = useRef(null);
    const executeScroll = () => window.scrollTo(0, htmlElRef.current.offsetTop);

    return [executeScroll, htmlElRef];
  };

  return (
    <div>
      <GlobalMenu />

      <div className={styles.chatPage}>
        <div className={styles.chat__sidebar}>
          <h1>
            Room
            <br />
            {displayRoom}
          </h1>
          <h3 className={styles.listTitle}>Users</h3>
          <ul className={styles.users}>
            {usersData.map((user) => {
              return <li className={styles.user}>{user}</li>;
            })}
          </ul>
        </div>

        <div className={styles.chat__main}>
          <div className={styles.chat__musicInfo}></div>
          <ScrollToBottom className={styles.chat__messages}>
            {messages.map((message) => {
              if (message.local) {
                return (
                  <p className={styles.messageLocal}>
                    <span className={styles.message__meta}>
                      {message.createdAt}
                    </span>
                    <span className={styles.message__ownName}>
                      {message.name}
                    </span>

                    <br />
                    <p className={styles.ownMessage}>{message.message}</p>
                  </p>
                );
              } else {
                return (
                  <p className={styles.messageLoca}>
                    <span className={styles.message__name}>{message.name}</span>
                    <span className={styles.message__meta}>
                      {message.createdAt}
                    </span>
                    <br />
                    <div className={styles.message}>{message.message}</div>
                  </p>
                );
              }
            })}
          </ScrollToBottom>
          {inRoom && (
            <div className={styles.compose}>
              <form>
                <input
                  name="message"
                  placeholder="Message"
                  required
                  autocomplete="off"
                  value={text}
                  onChange={handleMessageChange}
                />
                <button onClick={() => sendMessage()}>Send</button>
              </form>
            </div>
          )}
          <button
            className={styles.artList}
            onClick={() => {
              history.push("/artists");
            }}
          >
            → ArtistListPage
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
