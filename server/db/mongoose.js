const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://hamzahanif:q8m40Tmznw5mH7La@cluster0.uu7rf.mongodb.net/TodoApp?retryWrites=true',
{
    useNewUrlParser:true, 
    useUnifiedTopology: true,
    useFindAndModify: false 
});

module.exports = {mongoose}