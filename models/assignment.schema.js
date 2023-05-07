const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        createdBy:String,
        title: String,
        instructions: String,
        links: [{ type: String }],
        submittedWork: [{ 
            studentId:mongoose.Types.ObjectId, 
            workDocuments: [{type:String}],
            submittedTime:{type:Date,default:Date.now()}
        }]
    },
    { timestamps: true }
);

const assignment = mongoose.model("assignment", assignmentSchema);

module.exports = assignment;
