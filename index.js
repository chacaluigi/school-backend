const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const studentRoutes = require('./routes/studentRoutes.js');
const teacherRoutes = require('./routes/teacherRoutes.js');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Holaaa Luigiiiiii');
});

app.use('/students', studentRoutes);

app.use('/teachers', teacherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
