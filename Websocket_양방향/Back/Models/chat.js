const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const User = require("./user");

const Chat = sequelize.define(
  "Chat",
  {
    chat: {
      type: DataTypes.STRING,
    },
    user: {
      type: DataTypes.JSON, // 또는 필요한 형태로 변환할 수 있습니다.
    },
  },
  {
    timestamps: true,
  }
);

Chat.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Chat, { foreignKey: "userId" });

module.exports = Chat;
