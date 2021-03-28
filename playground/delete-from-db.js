const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Could not connect');
    }
    console.log('Connect Successfully');
    
    //Delete Many
    // db.collection('Users').deleteMany({
    //     name:'Mushtaq'
    // });
    //Delete One
    // db.collection('Users').deleteOne({
    //     name:'Hamza'
    // });

    //Find and Delete One
    db.collection('Users').findOneAndDelete({
        _id:new ObjectID('6036be7d63854d525a4b7945')
    }).then( result => {
        console.log(result);
    });
    db.close();
});