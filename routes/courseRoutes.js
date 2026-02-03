const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController.js');

router.get('/', CourseController.consult);
router.post('/', CourseController.insert);

module.exports = router;
