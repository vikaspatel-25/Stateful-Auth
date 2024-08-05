const { error } = require("console");
const fs = require("fs");


 function logReqRes(req,res){
   return (req,res,next)=>{ fs.appendFile("log.txt",
                  `\nTime: ${Date.now()} User: ${req.ip} Method: ${req.method} Url: ${req.path}\n`,
                  (err,data)=>{
                    next();
                  })}
}

module.exports =  logReqRes;
