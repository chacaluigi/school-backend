const db = require('../database/config.js');

class TeacherController {
  constructor() {}

  consult(req, res) {
    res.json({ msg: 'Consult teachers from class' });
  }

  insert(req, res) {
    res.json({ msg: 'Insert teacher from class' });
  }

  teacherDetail(req, res) {
    res.json({ msg: 'Teacher detail from class' });
  }

  updateTeacher(req, res) {
    res.json({ msg: 'Update teacher from class' });
  }

  deleteTeacher(req, res) {
    res.json({ msg: 'Delete teacher from class' });
  }
}

module.exports = new TeacherController();
