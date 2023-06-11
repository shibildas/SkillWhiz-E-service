const express = require("express");
const swaggerui = require("swagger-ui-express");
const server = express();
const logger = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoute = require("./Routes/adminRoute");
const userRoute = require("./Routes/userRoute");
const expertRoute = require("./Routes/expertRoute");
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const connectDb = require("./Controller/config/dbConfig");
const httpServer = http.createServer(server);
const swaggerjson = require("./swagger.json");
const chatConfig = require("./Controller/config/socketConfig");

server.use("/", express.static(path.join(__dirname, "Public")));
server.use(bodyParser.json({ limit: "1200kb" }));
connectDb(DATABASE_URL);
server.use(
  cors({
    origin: [process.env.CORS_API],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

server.use(logger("dev"));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

//Routes
server.use("/", userRoute);
server.use("/admin", adminRoute);
server.use("/expert", expertRoute);

//Chat Socket
chatConfig(httpServer);
//Swagger API Documentation
server.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerjson));

httpServer.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
  console.log(`Api Documentation at http://127.0.0.1:${port}/api-docs`);
});

module.exports = server;
