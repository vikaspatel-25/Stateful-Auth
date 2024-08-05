const express = require("express");
const authRouter = require("./routes/auth")
const staticRouter = require("./routes/ssr")
const logReqRes = require("./middlewares/logger")
const path  = require("path")
const {connectDB} = require("./connection")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT;
app = express();

//connection
connectDB(process.env.MONGO_URL)
.then(()=>{console.log("Connected to Database")});


//setup ejs
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,'views'));


//middlewares
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json());

//routes
app.use("/",staticRouter);
app.use("/auth",authRouter);



app.listen(PORT,()=>{console.log(`Server started at Port:${PORT}`)});