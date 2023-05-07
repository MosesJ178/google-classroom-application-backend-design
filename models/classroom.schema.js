const mongoose = require('mongoose');
const {review} = require('./announcementReviewChat.schema');
const assignment = require('./assignment.schema');

const classroomSchema = new mongoose.Schema({
    teachers:[{name:String,teacher_id:mongoose.Types.ObjectId}],
    students:[{name:String,student_id:mongoose.Types.ObjectId}],
    className:String,
    section:String,
    subject:String,
    classCode:String,
    assignments:[{
        type:mongoose.Types.ObjectId,
        ref:assignment
    }],
    announcements:[
        {
            sender:mongoose.Types.ObjectId,
            students:[{name:String,student_id:mongoose.Types.ObjectId}],
            details:{
                message:String,
                links:[{type:String}]
            },
            chats:{type:mongoose.Types.ObjectId,ref:review}
        }
    ]
},{timestamps:true});

classroomSchema.pre('save', function(next) {
    if (!this.isNew || this.classCode) {
      return next();
    }
    const timestamp = Date.now();
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    this.classCode = `${timestamp}${date}`;
    next();
  });

const classroom = mongoose.model("classroom",classroomSchema);

module.exports = {classroom};