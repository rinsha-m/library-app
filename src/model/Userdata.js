const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://username1:user1@myfiles.d1yi4.mongodb.net/FSDFiles?retryWrites=true&w=majority',{
    useCreateIndex : true,
    useFindAndModify :false,
    useUnifiedTopology: true,
    useNewUrlParser :true
});
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email:{type :String,unique:true},
    username:String,
    password:String   
});

var Userdata = mongoose.model('user',UserSchema);

module.exports = Userdata;