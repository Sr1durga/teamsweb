
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const tasksRoute = require("./routes/tasks");
const router = express.Router();
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);


dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/tasks", tasksRoute);


app.get('/' , (req , res) => {
  return res.status(201).send({success : true })
})






// http.listen(8090, function() {
//   var host = http.address().address
//   var port = http.address().port
//   console.log('App listening at http://%s:%s', host, port)
// });

app.listen(8090, () => {
  console.log("Backend server is running!");
});
