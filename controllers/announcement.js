const {classroom} = require('../models/classroom.schema');

const announcementDetailsCreate = async (req,res) => {
    const {sender,classroom_id,students,announceMessage,links} = req.body;
    try{
        await classroom.findByIdAndUpdate(classroom_id,{$push:{announcements:{sender,students,details:{message:announceMessage,links}}}})
        return res.status(200).json({annocement:1});
    }
    catch(err){
        return res.status(400).json({err:"err while creating announcement",details:err});
    }
}

const announcementDetailsDelete = async (req,res) => {
    const {announcement_id,classroom_id} = req.body;
    try{
        await classroom.findByIdAndUpdate(classroom_id,{$pull:{announcements:{_id:announcement_id}}});
        return res.status(200).json({annocement:1});
    }
    catch(err){
        return res.status(400).json({err:"err while deleting announcement"});
    }
}

const announcementDetailsUpdate = async (req,res) => {
    const {classroom_id,announcement_id,message,links} = req.body;
    try{
        await classroom.findOneAndUpdate(
            {_id: classroom_id, "announcements._id": announcement_id},
            {$set: {"announcements.$.details.message": message, "announcements.$.details.links": links}}
        );
        return res.status(200).json({success:1});
    }
    catch(err){
        return res.status(400).json({err:"err while updating announcement"});
    }
}

module.exports = {announcementDetailsCreate,announcementDetailsDelete,announcementDetailsUpdate}