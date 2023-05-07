const {user} = require('../models/user.schema');
const {classroom} = require('../models/classroom.schema');


const createClass = async (req,res) => {
    const {_id,Admin,teachers,students,className,section,subject,classCode,assignments,announcements} = req.body;
    try{
        const room = await classroom.create({className,section,subject,teachers:[{name:Admin,teacher_id:_id}]});
        if(!room){
            return res.status(400).json({error:"err while creating classroom"})
        }
        try{
            await user.findByIdAndUpdate(_id,{$push:{classRooms:room._id}})
        }
        catch(err){
            return res.status(400).json({error:"err while updating room"});
        }
        return res.status(200).json(room);
    }
    catch(err){
        return res.status(400).json({error:"err while creating classroom",details:err});
    }
}

const archiveClass = async (req,res) => {
    const {user_id,classroom_id} = req.body;
    try{
        const activeUser = await user.findById(user_id);
        if(activeUser.archivedRooms.includes(classroom_id)){
            await user.findByIdAndUpdate(user_id,{$addToSet:{classRooms:classroom_id},$pull:{archivedRooms:classroom_id}})
        }
        else{
            await user.findByIdAndUpdate(user_id,{$addToSet:{archivedRooms:classroom_id},$pull:{classRooms:classroom_id}})
        }
        return res.status(200).json({ success: 1 });
    }
    catch(err){
        return res.status(400).json({err:"err while archiving",details:err})
    }
}

const deleteClass = async (req,res) => {
    const {user_id,classroom_id} = req.body;
    let activeUser;
    try{
        activeUser = await user.findById(user_id);
        activeUser.archivedRooms = activeUser.archivedRooms.filter((id)=>id!=classroom_id);
        await user.findOneAndUpdate({_id:user_id},activeUser);
        await classroom.findByIdAndUpdate(classroom_id);
        return res.status(200).json({sucess:1});
    }
    catch(err){
        return res.status(400).json({err:"err while deleting classroom"});
    }
}

module.exports = {createClass,archiveClass,deleteClass}