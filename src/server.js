const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type -application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync DB');
  initail();
});

//simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my applicaiton' });
});

// routes
require('./routes/user.router')(app);
app.use('/api/test/', userRoutes);
const userRoutes = require('./routes/user.router');
app.use('/api/auth/', authRoutes);
const authRoutes = require('./routes/auth.routes');

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}.');
});

function initail() {
  Role.create({
    id: 1,
    name: 'user',
  });

  Role.create({
    id: 2,
    name: 'moderator',
  });

  Role.create({
    id: 3,
    name: 'admin',
  });
}
