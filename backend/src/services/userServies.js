const userRepo = require("../repository/userRepo");
exports.getUserById = async(data)=>{
    const user = await userRepo.getUserById(id)
    if(!user){
        throw new Error("user not found")
    }
    return user

}



exports.updateUser = async (id, data) => {
  const user = await userRepo.getUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  
  if (data.name) user.name = data.name;
  if (data.userName) user.userName = data.userName;
  if (data.email) user.email = data.email;
  if (data.password) user.password = data.password;

  await userRepo.updateUser(user);

  return user;
};




exports.followUser = async (myId, targetId) => {
  const me = await userRepo.getUserById(myId);
  const userToFollow = await userRepo.getUserById(targetId);

  if (!userToFollow) {
    throw new Error("User not found");
  }

  if (!me.following) {
    me.following = [];
  }

  if (me.following.includes(targetId)) {
    throw new Error("Already followed");
  }

  me.following.push(targetId);

  await userRepo.saveUser(me);
};

exports.unfollowUser = async (myId, targetId) => {
  const me = await userRepo.getUserById(myId);

  if (!me) {
    throw new Error("User not found");
  }

  if (!me.following || !me.following.includes(targetId)) {
    throw new Error("You are not following this user");
  }

  me.following = me.following.filter(
    (id) => id.toString() !== targetId
  );

  await userRepo.saveUser(me);
};




