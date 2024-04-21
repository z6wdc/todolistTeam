const http = require("http");
const dotenv = require("dotenv");
const Todo = require("./model/todo");
const headers = require("./headers");
const handleError = require("./handleError");
const handleSuccess = require("./handleSuccess");
const getTodo = require("./getTodo");
const postTodo = require("./postTodo");
const patchTodo = require("./patchTodo");

dotenv.config({ path: "./.env" });
const connectionString = process.env.DATABASE.replace(
  "<password>", 
  process.env.DATABASE_PASSWORD ??= ""
);
mongoose
  .connect(connectionString) 
  .then(() => { console.log("資料庫連線成功"); })
  
const requestListener = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  if (req.url == "/todos" && req.method == "GET") {
    // getTodo.js
    getTodos(req, res);
  } else if (req.url == "/todos" && req.method == "POST") {
    // postTodo.js
    req.on("end", () => postTodo(res, body));
  } else if (req.url == "/todos" && req.method == "DELETE") {
    // deleteTodo.js
  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    // deleteTodo.js
  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    // patchTodo.js
    req.on("end", () => patchTodo({ body, req, res }));
    
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
