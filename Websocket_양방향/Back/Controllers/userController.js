const User = require("../Models/user");
const userController = {};

userController.saveUser = async (
  userName,
  sockedId
) => {
  //이미 있는 유저인지 확인
  let user = await User.findOne({
    where: { name: userName },
  });

  //없다면 새로 유저정보 만들기
  if (!user) {
    user = await User.create({
      name: userName,
      token: sockedId,
      online: true,
    });
    console.log("new user", user);
  } else {
    //이미 있는 유저라면 연결정보 token값만 바꿔줌
    user.token = sockedId;
    user.online = true;
  }

  await user.save();
  return user;
};
userController.checkUser = async (sockedId) => {
  const user = await User.findOne({
    where: { token: sockedId },
  });
  if (!user) throw new Error("user not found");
  return user;
};
module.exports = userController;
