// import { Object } from 'core-js/library/web/timers';
// import { ObjectID, ObjectId } from '../../Users/SanjayChopra/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bson';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookSchema = new mongoose.Schema({
    liberaryId:{type: String},
    bookTitle:{type: String},
    bookAuthor:{type: String},
    bookPrice:{type: String},
    quantity:{type: Number},
    issuedTo:{type: Array},
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Book', BookSchema);