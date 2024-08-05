const User = require("../models/users");
const {v4:uuidv4} = require("uuid")


async function setUser(uid,user){
     if(!uid){
        uid = uuidv4();
     }
    let filter = {_id: user};
    let update = { $set:{uid:uid}}

    const  result = await User.updateOne(filter, update)
    return result;
}

async function getUser(uid){
   const user = await User.findOne({uid:uid}) 
   return user ;
}

module.exports = {
    setUser,
    getUser,
}
