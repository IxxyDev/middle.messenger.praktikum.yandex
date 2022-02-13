const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.static('./dist/'));

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
});
