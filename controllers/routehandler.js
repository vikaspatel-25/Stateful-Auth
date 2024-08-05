const User = require("../models/users");
const {setUser,getUser} = require("../services/sessionhandler")
const {v4:uuidv4} = require("uuid")
const bodyParser = require("body-parser");

async function handleSignup(req, res) {
    const { name, email, password } = req.body;
    try {
        await User.create({
            name,
            email,
            password,
        });
        console.log("user created");
        return res.json({success:'user created successfullly'});
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(400).send("Error: Please enter valid data");
    }
}

async function handleLogin(req,res){
   const {email,password} = req.body
   let user = await User.findOne({email,password})
   if(user){
   const sessionId = uuidv4();
   const expiry = new Date(Date.now()+5*60*1000);
   user = user._id;
   await setUser(sessionId,user);
   res.cookie("uid",sessionId,{expires: expiry});
   return res.json({success: 'login successfull'});
}
   return res.json({msg:'User not found! Please check email or password '});  
}

async function authoriseUser(req,res){
  const userUid = req.cookies?.uid;
  if(!userUid) {return res.render("login")}
  console.log(userUid);

  const user = await getUser(userUid);
  console.log(user);

  if(user){
    console.log(user);
    req.user = user;
    return res.render("home",{user:user})
  }
  else{
     return res.render("login")
  }
  
}
    



module.exports = {
    handleLogin,
    handleSignup,
    authoriseUser,
}