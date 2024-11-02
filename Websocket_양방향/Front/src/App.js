import "./App.css";
import socket from "./server";
import { useEffect, useState } from "react";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState(
    []
  );
  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList((prevState) =>
        prevState.concat(message)
      );
    });
    askUserName();
  }, []);
  const askUserName = () => {
    const userName = prompt(
      "당신의 이름을 입력하세요"
    );
    console.log("사용자 : ", userName);

    socket.emit("login", userName, (res) => {
      if (res.ok) {
        // res.data.name = userName;
        setUser(res.data);
        console.log("Res", res);
      }
    });
  };

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", message, (res) => {
      // console.log("sendMessage res", res);
    });
    setMessage("");
  };

  return (
    <div>
      <div className="App">
        <MessageContainer
          messageList={messageList}
          user={user}
        />
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
