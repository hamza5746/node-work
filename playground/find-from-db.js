const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Could not connect');
    }
    console.log('Connect Successfully');
    
    // db.collection('Users').find({
    //     name:'Hamza'
    // }).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs));
        
    // },err=>{
    //     console.log(err);
    // });
    db.collection('Users').find({
        name:'Hamza'
    }).count().then((count) => {
        console.log(count);
        
    },err=>{
        console.log(err);
    });
    db.close();
});