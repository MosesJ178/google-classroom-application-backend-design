const {review} = require('../models/announcementReviewChat.schema');
const {classroom} = require('../models/classroom.schema');

const announcementMessage = async (req,res) => {
    const {sender,sender_id,msg,announcement_id,classroom_id,chatId} = req.body;
    try{
        if(chatId == undefined){
            const rev = new review({chatlists:[{sender,sender_id,msg}]});
            const freshChat = await rev.save();
            console.log(freshChat)
            await classroom.findOneAndUpdate(
                {_id: classroom_id, "announcements._id": announcement_id},
                {$set: {"announcements.$.chats": freshChat._id}}
            );
            // await classroom.findByIdAndUpdate({_id:classroom_id,"announcements._id":announcement_id},{$set:{"announcements.$.chats":freshChat._id}})
            return res.status(200).json({_id:freshChat._id});
        }
        else{
            const oldChat = await review.findByIdAndUpdate(chatId,{$push:{chatlists:{sender,sender_id,msg}}},{new:true});
            return res.status(200).json(oldChat);
        }
    }
    catch(err){
        return res.status(400).json({err:"err while posting msg",details:err})
    }
}

const announcementMessageDelete = async (req,res) => {
    const {chatId,msgDelete} = req.body;
    try {
        const updatedReview = await review.findByIdAndUpdate(
          chatId,
          { $pull: { chatlists: { _id: msgDelete } } },
          { new: true }
        );
        res.json(updatedReview);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

const announcementMessageUpdate = async (req,res) => {
    const { chatId,msgUpdate,msg } = req.body;
    try{
        await review.findByIdAndUpdate({_id:chatId,'chatlists._id':msgUpdate},{$set:{'chatlists.$.msg':msg}},{new:true});
    }
    catch(err){
        return res.status(400).json({ message: err.message });
    }
}

module.exports = {announcementMessage,announcementMessageDelete,announcementMessageUpdate}