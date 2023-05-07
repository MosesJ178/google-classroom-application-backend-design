const { classroom } = require("../models/classroom.schema");
const { user } = require("../models/user.schema");

const enroll = async (req, res) => {
  const { name, user_id, classCode } = req.body;
  try {
    const room = await classroom.findOne({ classCode });
    const isEnrolled = room.students.some(
      (student) => String(student.student_id) === String(user_id)
    );
    if (!isEnrolled) {
      room.students.push({name,student_id:user_id});
      await room.save();
      await user.findByIdAndUpdate(user_id,{$push:{classRooms:room._id}})
    } else {
      return res.status(400).json({ err: "student already exit" });
    }
    return res.status(200).json({ sucess: 1 });
  } catch (err) {
    res.status(400).json({ err: "unkown err", details: err });
  }
};

const unenroll = async (req, res) => {
  const { student_id, classroom_id } = req.body;
  try{
    await classroom.findByIdAndUpdate(classroom_id, {
        $pull: { students: { student_id: student_id } },
    });
    await user.findByIdAndUpdate(student_id, {
        $pull: { classRooms: classroom_id },
    });
    return res.status(400).json({sucess:"enrolled"});
  }
  catch(err){
    return res.status(400).json({err:"err while unenrolling user"});
  }
};

module.exports = { enroll, unenroll };
