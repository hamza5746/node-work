const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Could not connect');
    }
    console.log('Connect Successfully');
    
    db.collection('Users').insertOne({
        name:'Hamza',
        age:'27',
        city:'Karachi',
        completed:false
    }, (error,result) => {
        if(error){
            return console.log('Unable to inserted ', error);
        } 
        console.log(JSON.stringify(result.ops));
        
    });
    db.close();
});