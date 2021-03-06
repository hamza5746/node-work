const request = require('supertest');
const expect= require('expect');

const {Todo} = require('../models/todo');

const {app} = require('../server');
const { ObjectID } = require('bson');

let todos = [
    {
        _id:new ObjectID(),
        text:"Something from test"
    },
    {
        _id:new ObjectID(),
        text:"Something from test 2"
    },
    
]
beforeEach(done => {
    Todo.deleteMany({}).then(()=> {
        Todo.insertMany(todos).then(()=> done());
    });
    
});
describe("POST /todos",()=>{
    it('should create a new todo', (done) => {
        let text = "Test todo text";
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((resp) => {
                expect((resp.body.text)).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                //For database
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(err =>{ done(err) });
            });
    });

    it('should not create new todo with the invalid body', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                //For database
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    // expect(todos[0].text).toBe(text);
                    done();
                }).catch(err =>{ done(err) });
            });
    });
});

describe("GET /todos",()=>{
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect(res=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});
describe("GET /todos/:id ",()=>{
    it('should return todo doc', (done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });
    it('should return 404 if no todo found', (done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
    it('should return 404 if non object ids', (done)=>{
        request(app)
        .get(`/todos/123abc`)
        .expect(404)
        .end(done);
    });
});
