const mongoose = require('mongoose');
const classroom = require('./classroom.schema');
const userSchema = new mongoose.Schema({
    name:String,
    password:String,
    classRooms:[
        {
            type:mongoose.Types.ObjectId,
            ref:classroom
        }
    ],
    archivedRooms:[
        {
            type:mongoose.Types.ObjectId
        }
    ]
},{timestamps:true})

const user = mongoose.model("user",userSchema);
module.exports = {user}