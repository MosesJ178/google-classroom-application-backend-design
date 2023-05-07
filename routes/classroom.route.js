const express = require('express');
const {announcementDetailsCreate,announcementDetailsUpdate,announcementDetailsDelete} = require('../controllers/announcement');
const {enroll,unenroll} = require('../controllers/joinStudentTeacherRoom');
const {createClass,archiveClass,deleteClass} = require('../controllers/classRoom');
const {announcementMessage,announcementMessageDelete,announcementMessageUpdate} = require('../controllers/chatmessages');
const {assignmentPost,assignmentUpdate,assignmentDelete,postSubmitAssignment} = require('../controllers/assignment');

const router = express.Router();

router.post('/createclassroom',createClass)
router.put('/archiveclassroom',archiveClass)
router.post('/deleteclassroom',deleteClass)

router.post('/enroll',enroll)
router.post('/unenroll',unenroll)

router.post('/announcement',announcementDetailsCreate);
router.delete('/announcement',announcementDetailsDelete);
router.put('/announcement',announcementDetailsUpdate);

router.post('/announcement/message',announcementMessage);
router.delete('/announcement/message',announcementMessageDelete);
router.put('/announcement/message',announcementMessageUpdate);

router.post('/assignment',assignmentPost);
router.post('/submitassignmnet',postSubmitAssignment);
router.patch('/assignment',assignmentUpdate);
router.delete('/assignment',assignmentDelete);

module.exports = router