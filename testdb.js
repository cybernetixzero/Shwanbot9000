const DatabaseProvider = require('./providers/database-provider');

const databaseProv = new DatabaseProvider();
const id = databaseProv.setHJConsent('matt', true);

console.log(id);
