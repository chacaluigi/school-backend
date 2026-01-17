class StudentController {
  constructor() {}

  consult(req, res) {
    res.json({ msg: 'Student consult from class' });
  }

  insert(req, res) {
    res.json({ msg: 'Insert student from class' });
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
