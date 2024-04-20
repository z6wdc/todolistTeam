const http = require("http");
const Todo = require("./model/todo");
const headers = require("./headers");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const handleError = require("./handleError");
const handleSuccess = require("./handleSuccess");
const postTodo = require("./postTodo");
const deleteTodo = require("./deleteTodo");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB) // 連線資料庫
  .then(() => {
    console.log("資料庫連線成功");
  })
  .catch((error) => {
    console.log(error);
  });

const requestListener = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  if (req.url == "/todos" && req.method == "GET") {
    // getTodo.js
  } else if (req.url == "/todos" && req.method == "POST") {
    // postTodo.js
    req.on("end", () => postTodo(res, body));
  } else if (req.url == "/todos" && req.method == "DELETE") {
    // deleteTodo.js
  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    // deleteTodo.js
    deleteTodo(res, req);
  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    // patchTodo.js
  } else if (req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網站路由",
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
