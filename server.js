require('dotenv').config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to database...'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
