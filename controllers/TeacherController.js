const db = require('../database/config.js');

class TeacherController {
  constructor() {}

  consult(req, res) {
    try {
      const query = `SELECT * FROM teachers;`;
      db.query(query, (err, rows) => {
        if (err) {
          return res.status(400).send(err);
        }
        if (rows.length === 0) {
          return res
            .status(400)
            .json({ msg: 'There are no registered teachers' });
        }
        res.status(200).send(rows);
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  insert(req, res) {
    try {
      const {
        teacher_id,
        dni,
        name,
        surname,
        email,
        profession,
        phone_number,
      } = req.body;
      const query = `INSERT INTO teachers (dni, name, surname, email, profession, phone_number) VALUES(?, ?, ?, ?, ?, ?);`;
      db.query(
        query,
        [dni, name, surname, email, profession, phone_number],
        (err, rows) => {
          if (err) {
            return res.status(400).send(err);
          }
          res.status(201).json({ msg: 'Teacher insert successfully', rows });
        },
      );
    } catch (err) {
      res.status(500).send(err);
    }
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
