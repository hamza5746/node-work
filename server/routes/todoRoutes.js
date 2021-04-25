const express = require('express');
const todoController = require('./../controllers/todoController');
const router = express.Router();

router.param('id', todoController.checkId);

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
.post(todoController.checkData,todoController.addTodo)

router.route('/:id')
.get(todoController.getTodobyId).
patch(todoController.updataTodo)
.delete(todoController.deleteTodo);


module.exports = router;