/*------configuration principale du serveur------*/
const express = require('express');
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config/db.config');

const geographyRoutes = require('./routes/geography.route');
const sectorRoutes = require('./routes/sector.route');
const equityRoutes = require('./routes/equity.route');
const userRoutes = require('./routes/user.route');

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
  .then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
  );

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/geography', geographyRoutes);
app.use('/api/sector', sectorRoutes);
app.use('/api/equity', equityRoutes);
app.use('/api/auth', userRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
