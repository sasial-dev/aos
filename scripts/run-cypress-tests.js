const cypress = require('cypress');
const server = require('./start-server');

cypress
  .run()
  .then((result) => {
    server.close();
    if (result.failures) {
      console.error('Could not execute tests');
      console.error(result.message);
      process.exit(result.failures);
    }

    // print test results and exit
    // with the number of failed tests as exit code
    process.exit(result.totalFailed);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
