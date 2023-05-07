const mongoose = require('mongoose');
const chatlistSchema = new mongoose.Schema({
    chatlists: [
        {
            sender_id:mongoose.Types.ObjectId,
            sender:String,
            msg:String
        }
    ]
},{timestamps:true})

const review = mongoose.model("review", chatlistSchema);

module.exports = { review }