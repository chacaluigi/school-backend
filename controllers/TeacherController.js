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
          res
            .status(201)
            .json({ msg: 'Teacher insert successfully', teacher_id });
        },
      );
    } catch (err) {
      res.status(500).send(err);
    }
  }

  teacherDetail(req, res) {
    try {
      const { id } = req.params;
      const query = `SELECT * FROM teachers WHERE teacher_id = ?;`;
      db.query(query, id, (err, rows) => {
        if (err) {
          return res.status(404).send(err);
        }
        if (rows.length === 0) {
          return res.status(404).json({ msg: 'Teacher not found.' });
        }
        res.status(200).json(rows[0]);
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  updateTeacher(req, res) {
    try {
      const { id } = req.params;
      const { dni, name, surname, email, profession, phone_number } = req.body;
      const query = `UPDATE teachers SET dni=?, name=?, surname=?, email=?, profession=?,phone_number=? WHERE teacher_id = ?`;
      db.query(
        query,
        [dni, name, surname, email, profession, phone_number, id],
        (err, rows) => {
          if (err) {
            return res.status(404).send(err);
          }
          if (rows.affectedRows === 0) {
            return res.status(404).json({ msg: 'Teacher not found to update' });
          }
          res.status(200).json({ msg: 'Teacher updated successfully' });
        },
      );
    } catch (err) {
      res.status(500).send(err);
    }
  }

  deleteTeacher(req, res) {
    try {
      const { id } = req.params;
      const query = `DELETE FROM teachers WHERE teacher_id = ?;`;
      db.query(query, [id], (err, rows) => {
        if (err) {
          return res.status(404).send(err);
        }
        if (rows.affectedRows === 0) {
          return res
            .status(404)
            .json({ msg: 'The teacher was no longer there' });
        }
        res.status(200).json({ msg: 'Teacher delete successfully', id });
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new TeacherController();
