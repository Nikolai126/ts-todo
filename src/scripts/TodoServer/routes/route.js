const Router = require('express');
const router = new Router();
const todoController = require('../controllers/todoController');

router.post('/', todoController.createTodo);
router.get('/', todoController.readTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
