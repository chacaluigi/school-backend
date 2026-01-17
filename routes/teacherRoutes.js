const express = require('express');
const TeacherController = require('../controllers/TeacherController');
const router = express.Router();

router.get('/', TeacherController.consult);

router.post('/', TeacherController.insert);

router
  .route('/:id')
  .get(TeacherController.teacherDetail)
  .put(TeacherController.updateTeacher)
  .delete(TeacherController.deleteTeacher);

module.exports = router;
