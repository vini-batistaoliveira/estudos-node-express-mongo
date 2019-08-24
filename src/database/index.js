const mongoose = require('mongoose');
const senha = require('../config/auth.json');

const dbName = 'budatech01';
const dbUser = 'budatech01';
const dbPassword = encodeURIComponent(senha.senhaBanco);

const MONGODB_URI = `mongodb://${dbUser}:${dbPassword}@mongodb.budatech.kinghost.net:27017/${dbName}`;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

module.exports = mongoose;
