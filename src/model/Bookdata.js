const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://username1:user1@myfiles.d1yi4.mongodb.net/FSDFiles?retryWrites=true&w=majority',{
    useCreateIndex : true,
    useFindAndModify :false,
    useUnifiedTopology: true,
    useNewUrlParser :true
});
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title:String,
    author:String,
    genre:String,
    description:String,
    image:String
    
});

var Bookdata = mongoose.model('bookdata',BookSchema);

module.exports = Bookdata;

