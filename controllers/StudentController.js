const db = require('../database/config.js');

class StudentController {
  constructor() {}

  consult(req, res) {
    res.json({ msg: 'Student consult from class' });
  }

  insert(req, res) {
    try {
      const { dni, name, surname, email } = req.body;
      res.status(201).json({ message: 'Student has been created.' });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

  studentDetail(req, res) {
    res.json({ msg: 'Student detail from class' });
  }

  updateStudent(req, res) {
    res.json({ msg: 'Update student from class' });
  }

  deleteStudent(req, res) {
    res.json({ msg: 'Delete student from class' });
  }
}

module.exports = new StudentController();
