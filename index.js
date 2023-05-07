const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/user',require('./routes/user.route'))
app.use('/c',require('./routes/classroom.route'))

const connectMongoDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/googleClassRoom");
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
  }
}
connectMongoDb()
.then(()=>{
    app.listen(5000,()=>{
        console.log("server is running on port 5000");
    })
})