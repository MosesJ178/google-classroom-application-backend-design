const assignment = require('../models/assignment.schema');
const {classroom} = require('../models/classroom.schema');

const assignmentPost = async (req,res) => {
    const {title,instructions,createdBy,links,classroom_id} = req.body;
    try{
        const assignDoc = await assignment.create({title,createdBy,instructions,links});
        await classroom.findByIdAndUpdate(classroom_id,{$push:{assignments:assignDoc}});
        return res.status(200).json(assignDoc);
    }
    catch(err){
        return res.status(400).json({err:"err while creating assignment",details:err})
    }
}


const postSubmitAssignment = async (req,res) => {
    const {assignmentId,studentId,workDocuments} = req.body;
    console.log(workDocuments);
    try{
        await assignment.findByIdAndUpdate(assignmentId,{$push:{submittedWork:{studentId:studentId,workDocuments:workDocuments}}})
        return res.status(200).json({sucess:1})
    }
    catch(err){
        return res.status(400).json({err:"err while posting assignment",details:err});
    }
}


const assignmentUpdate = async (req,res) => {
    const {title,instructions,assignmentId,links} = req.body;
    try{
        await assignment.findByIdAndUpdate(assignmentId,{$set:{title:title,instructions:instructions,links:links}})
        return res.status(200).json({sucess:1})
    }
    catch(err){
        return res.status(400).json({err:"err while updating assignment",details:err});
    }
}
const assignmentDelete = async (req,res) => {
    const {assignmentId} = req.body;
    try{
        await assignment.findByIdAndDelete(assignmentId);
        return res.status(200).json({sucess:1})
    }
    catch(err){
        return res.status(400).json({err:"err while deleting assignment",details:err});
    }
}

module.exports = {assignmentPost,assignmentUpdate,assignmentDelete,postSubmitAssignment}