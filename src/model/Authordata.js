const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://username1:user1@myfiles.d1yi4.mongodb.net/FSDFiles?retryWrites=true&w=majority',{
    useCreateIndex : true,
    useFindAndModify :false,
    useUnifiedTopology: true,
    useNewUrlParser :true
});
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    name:String,
    description:String,
    image:String
    
});

var Authordata = mongoose.model('authordata',AuthorSchema);

module.exports = Authordata;

