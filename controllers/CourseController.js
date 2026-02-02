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
}

module.exports = new CourseController();
