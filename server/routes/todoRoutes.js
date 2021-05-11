const express = require('express');
const todoController = require('./../controllers/todoController');
const router = express.Router();

// router.param('id', todoController.checkId); For middleware function 

//Top 5 
router
    .route('/top-3-cheap')
    .get(todoController.aliasTodo,todoController.getAllTodos)

//For stats
router.route('/get-stats')
.get(todoController.getTodoStats);

//For stats
router.route('/get-month-stats/:year')
.get(todoController.getMonthPlan);



router.route('/')
.get(todoController.getAllTodos)
.post(todoController.addTodo) // todoController.checkData

router.route('/:id')
.get(todoController.getTodobyId).
patch(todoController.updataTodo)
.delete(todoController.deleteTodo);


module.exports = router;