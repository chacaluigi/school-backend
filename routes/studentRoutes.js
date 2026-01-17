const express = require('express');
const StudentController = require('../controllers/StudentController.js');
const router = express.Router();

router.get('/', StudentController.consult);

router.post('/', StudentController.insert);

router
  .route('/:id')
  .get(StudentController.studentDetail)
  .put(StudentController.updateStudent)
  .delete(StudentController.deleteStudent);

module.exports = router;
