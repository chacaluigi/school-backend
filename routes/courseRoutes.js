const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController.js');

router.get('/', CourseController.consult);
router.post('/', CourseController.insert);

router
  .route('/:id')
  .get(CourseController.courseDetail)
  .put(CourseController.updateCourse)
  .delete(CourseController.deleteCourse);

module.exports = router;
