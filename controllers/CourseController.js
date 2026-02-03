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
          // if teacher_id is invalid
          if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
              msg: `The teacher with ID ${teacher_id} does not exist`,
            });
          }
          console.error(err);
          return res.status(500).json({ msg: 'Database error' });
        }

        res.status(201).json({
          msg: 'Course inserted successfully: ',
          courseId: rows.insertId,
        });
      });
    } catch (err) {
      res.status(500).json({ msg: 'Internal server error' });
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

  updateCourse(req, res) {
    try {
      const { id } = req.params;
      const { name, description, teacher_id } = req.body;
      const query = `UPDATE courses SET name=?, description=?, teacher_id=? WHERE course_id = ?;`;
      db.query(query, [name, description, teacher_id, id], (err, rows) => {
        if (err) {
          // if teacher_id does not exist
          if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
              msg: `The teacher with ID=${teacher_id} does not exist`,
            });
          }
          console.error(err);
          return res.status(500).json({ msg: 'Update database error' });
        }

        if (rows.affectedRows === 0) {
          return res
            .status(404)
            .json({ msg: `Course not found to update with ID=${id}` });
        }

        res.status(200).json({ msg: 'Course updated successfully' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Internal server error' });
    }
  }

  deleteCourse(req, res) {}
}

module.exports = new CourseController();
