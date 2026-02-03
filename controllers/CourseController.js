const db = require('../database/config.js');

class CourseController {
  constructor() {}

  consult(req, res) {
    try {
      const query = `SELECT * FROM courses;`;
      db.query(query, (err, rows) => {
        if (err) {
          return res.status(400).send(err);
        }
        if (rows.length === 0) {
          return res.status(404).json({ msg: 'No courses to show' });
        }
        res.status(200).json(rows);
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  insert(req, res) {
    try {
      const { name, description, teacher_id } = req.body;
      const query = `INSERT INTO courses (name, description, teacher_id) VALUES(?, ?, ?);`;
      db.query(query, [name, description, teacher_id], (err, rows) => {
        if (err) {
          return res.status(400).send(err);
        }
        if (rows.affectedRows === 0) {
          return res.status(404).json({ msg: 'The course was not inserted' });
        }
        res
          .status(201)
          .json({ msg: 'Course inserted successfully: ' + rows.insertId });
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  courseDetail(req, res) {
    try {
      const { id } = req.params;
      const query = `SELECT * FROM courses WHERE course_id = ?;`;
      db.query(query, [id], (err, rows) => {
        if (err) {
          return res.status(400).send(err);
        }
        if (rows.length === 0) {
          return res.status(404).json({ msg: 'Course not found' });
        }
        res.status(200).json(rows[0]);
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  updateCourse(req, res) {}

  deleteCourse(req, res) {}
}

module.exports = new CourseController();
