const express = require("express");
const mongoose = require("mongoose");
const adminRouter = require("./routers/adminRouter");
const userRouter = require("./routers/userRouter");
const etatRouter = require("./routers/etatRouter");
const secteurRouter = require("./routers/secteurRouter");
const etablissementRouter = require("./routers/etablissementRouter");
const bienfaitRouter=require('./routers/bienfaitRouter')
const employerRouter = require("./routers/employerRouter");
const contactRouter=require("./routers/contactRouter");
const reservationRouter=require("./routers/reservationRouter");
var fileExtension = require('file-extension')

const cors = require('cors')
multer = require('multer');
path = require('path');
const PATH = './uploads';
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    let newName=file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname)
    cb(null,newName)
   req.newName=newName
  }
});
let upload = multer({
  storage: storage
});


const app = express();
app.use(express.json());

app.use(express.json())
app.use(cors({
  origin: true, 
  credentials: true, 
  methods: 'POST,GET,PUT,OPTIONS,DELETE' 
}));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors())
app.get('/api', function (req, res) {
  res.end('File catcher');
});
app.post('/api/upload', upload.single('image'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });
  } else {
    console.log('File is available!');
    return res.send({
      success: true,
      file:req.newName
    })
  }
});
const db = "mongodb://localhost:27017/tickterie";
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connection");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/etat", etatRouter);
app.use("/secteur", secteurRouter);
app.use("/etablissement", etablissementRouter);
app.use("/bienfait", bienfaitRouter);
app.use("/employer", employerRouter);
app.use("/contact",contactRouter);
app.use("/reservation",reservationRouter);


app.listen(3000, () => {
  console.log("server running on port 3000");
});
