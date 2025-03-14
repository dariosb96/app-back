const {server}  = require('./src/app.js');
const { conn } = require('./src/db.js');
const port = process.env.PORT

conn.sync({ force: false }).then(() => {
    server.listen(3000, () => {
      console.log(`listening at ${port}`); // eslint-disable-line no-console
      // console.log(`listening at 3000`); // eslint-disable-line no-console
    });
  });

  