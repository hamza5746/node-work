const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Could not connect');
    }
    console.log('Connect Successfully');
    

    //Find and Delete One
    db.collection('Users').findOneAndUpdate({
        _id:new ObjectID('6036bf1e9133f3529ffcea6f')
    },{
        $set:{
            name:'Mustaqeem'
        },
        $inc:{
            age:1
        }
    },
    {
        returnOriginal:false
    }
    
    ).then( result => {
        console.log(result);
    });
    db.close();
});