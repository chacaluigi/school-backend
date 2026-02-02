const db = require('../database/config.js');

class StudentController {
  constructor() {}

  consult(req, res) {
    try {
      db.query(`SELECT * FROM students;`, (err, rows) => {
        if (err) {
          return res.status(400).send(err);
        }
        if (rows.length === 0) {
          return res.status(204).json({ msg: 'There are no students.' });
        }
        res.status(200).json(rows);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

  insert(req, res) {
    try {
      const { dni, name, surname, email } = req.body;
      db.query(
        `INSERT INTO students(dni,name,surname,email) VALUES(?, ?, ?, ?);`,
        [dni, name, surname, email],
        (err, rows) => {
          if (err) {
            return res.status(400).send(err);
          }
          res.status(201).json({ id: rows.insertId });
        },
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

  studentDetail(req, res) {
    try {
      const { id } = req.params;
      db.query(
        `SELECT * FROM students WHERE student_id=?;`,
        [id],
        (err, rows) => {
          if (err) {
            console.log(err);
            return res.status(400).send(err);
          }
          if (rows.length === 0) {
            return res.status(404).json({ msg: 'Student not found.' });
          }
          res.status(200).json(rows[0]);
        },
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

  updateStudent(req, res) {
    try {
      const { id } = req.params;
      const { dni, name, surname, email } = req.body;
      const sql = `UPDATE students SET dni=?, name=?, surname=?, email=? WHERE student_id=?;`;
      db.query(sql, [dni, name, surname, email, id], (err, rows) => {
        if (err) {
          return res.status(400).send(err);
        }
        if (rows.affectedRows === 0) {
          return res.status(404).json({ msg: 'Student not found to update' });
        }
        res.status(200).json({ msg: 'Student updated successfully', id });
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  deleteStudent(req, res) {
    try {
      const { id } = req.params;
      const query = `DELETE FROM students WHERE student_id = ?;`;
      db.query(query, [id], (err, rows) => {
        if (err) {
          return res.status(400).send(err);
        }
        if (rows.affectedRows === 0) {
          return res.status(404).json({ msg: 'Student not found for delete' });
        }
        res.status(200).json({ msg: 'Student delete successfully', id });
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new StudentController();
