// import { Object } from 'core-js/library/web/timers';
// import { ObjectID, ObjectId } from '../../Users/SanjayChopra/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bson';

var mongoose = require('mongoose');

var LiberarySchema = new mongoose.Schema({
  liberaryName:String,
  
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Liberary', LiberarySchema);