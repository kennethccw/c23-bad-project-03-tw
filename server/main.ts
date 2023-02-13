import express from "express";
import expressSession from "express-session";
import { logger } from "./utils/logger";
// import { userRoutes } from "./routes/userRoute";
import Knex from "knex";
import dotenv from "dotenv";
import path from "path";
import grant from "grant";
import bodyParser from 'body-parser'
import http from "http";
import {Server as SocketIO} from "socket.io";


dotenv.config();
import knexConfigs from "./knexfile";
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
export const knex = Knex(knexConfig);
// export const test = "test 1234s";
// console.log(test);




/* google configuration-start */
const grantExpress = grant.express({
  "defaults":{
    "origin": `https://frameofmind.dev.kayaleung.me`,
    "transport": "session",
    "state": true,
  },
  "google":{
    "key": process.env.GOOGLE_CLIENT_ID || "",
    "secret": process.env.GOOGLE_CLIENT_SECRET || "",
    "scope": ["profile", "email"],
    "callback": "/user/login/google"
  }
});
/* google configuration-end */


const app = express();
app.use(bodyParser.json({limit: '50mb'}))
app.use(express.json());

// socket io
const server = new http.Server(app)
const io = new SocketIO(server)

io.on("connection", (socket) => {
  socket.emit('welcome-message', { msg: "You are not alone! Let's have a chat!" })
  
  socket.on("send-message",(data) => {
    console.log("socket-data=",data)
    io.emit("send-message",data)
    console.log("main line 56",data)
  })


  socket.on("disconnect",() => {
    // console.log(socket)
    logger.debug(`${socket.id}disconnected`)
  })
})

app.post("/getTextMessage",(req, res) => {
  console.log("main-getTEXTMessage=",req.body)
  const textMessage = req.body;
  
  io.emit("new-message",textMessage)
  res.json({message:"success"})

})

declare module 'express-session' {
  interface Session {
    user: {id: number | null ; username: string | null; email?: string | null}
    isLoggedMood: boolean
  }
}


// app.use((req, res, next) => {
//   logger.debug(`Path: ${req.path},,, Method: ${req.method}`);
//   next();
// });

app.use(
  expressSession({
    secret: Math.random().toString(32).slice(2), // 32 base number
    resave: true,
    saveUninitialized: true,
  })
);

/* for google-login config. */
app.use(grantExpress as express.RequestHandler);

import { routes } from "./routes";
app.use(routes);

app.use(express.static(path.join(__dirname, "public")));
//messageId
import {messageIdService} from "./services/messageIdService"
import {messageIdController} from "./controllers/messageIdController"
const messageidService = new messageIdService(knex)
export const messageidController = new messageIdController(messageidService)
import {messageIdRoute} from "./router/messageIdRoute"
app.use("/messageId",messageIdRoute)

//chat room
import {chatRoomService} from "./services/chatRoomService"
import {chatRoomController} from "./controllers/chatRoomController"
const chatroomservice = new chatRoomService(knex)
export const chatroomController = new chatRoomController(chatroomservice)
import {chatRoomRoute} from './router/chatRoomRoute'
app.use("/chatRoom",chatRoomRoute)

// mood Log
import {moodLogService} from "./services/activitiesService"
import {moodLogController} from "./controllers/activitiesController"
const moodlogService = new moodLogService(knex);
export const moodlogController = new moodLogController(moodlogService);
import {moodLogRoutes} from './router/activitiesRoute'
app.use("/moodlog",moodLogRoutes)

// 404
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});



const PORT = 8080;
server.listen(PORT, () => {
  logger.info(`listening to port ${PORT}`);
  logger.info(`http://localhost:${PORT}`);
});
