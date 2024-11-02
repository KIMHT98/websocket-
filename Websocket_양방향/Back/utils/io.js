const userController = require("../Controllers/userController");
const chatController = require("../Controllers/chatController");

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async (userName, cb) => {
      //유저정보 저장
      try {
        const user =
          await userController.saveUser(
            userName,
            socket.id
          );
        cb({ ok: true, data: user });
      } catch (e) {
        cb({ ok: false, error: e.message });
      }
    });
    socket.on(
      "sendMessage",
      async (message, cb) => {
        try {
          //유저찾기
          const user =
            await userController.checkUser(
              socket.id
            );
          //메세지 저장
          const newMessage =
            await chatController.saveChat(
              message,
              user
            );
          io.emit("message", newMessage);
          cb({ ok: true });
        } catch (e) {
          cb({ ok: false, error: e.message });
        }
      }
    );
    socket.on("disconnect", () => {
      console.log(
        "user is disconnected",
        socket.id
      );
    });
  });
};
