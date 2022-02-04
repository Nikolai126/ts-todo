const dataBase = require('../dataBase');

class TodoController {
  async createTodo(req, res) {
    try {
      const { text } = req.body;
      const newTodo = await dataBase.query(`INSERT INTO "todo" ("text", "checked") VALUES ($1, $2) RETURNING *`, [
        text,
        false
      ]);
      const todoList = await dataBase.query(`SELECT * FROM "todo" ORDER BY "id"`);
      return res.json(todoList.rows);
    } catch (err) {
      res.json(err);
    }
  }

  async readTodo(req, res) {
    try {
      const todoList = await dataBase.query(`SELECT * FROM "todo" ORDER BY "id"`);
      return res.json(todoList.rows);
    } catch (error) {
      res.json(error);
    }
  }

  async updateTodo(req, res) {
    try {
      const { text, checked } = req.body;
      const todoId = req.params.id;
      const statusCheck = JSON.stringify(checked);
      if (text) {
        const updatedTodo = await dataBase.query(`UPDATE "todo" SET "text" = $1 WHERE "id" = $2;`, [text, todoId]);
        const todoList = await dataBase.query(`SELECT * FROM "todo" ORDER BY "id"`);
        return res.json(todoList.rows);
      }

      if (statusCheck) {
        const updatedStatus = await dataBase.query(`UPDATE "todo" SET "checked" = $1 WHERE "id" = $2`, [
          checked,
          todoId
        ]);
        const todoList = await dataBase.query(`SELECT * FROM "todo" ORDER BY "id"`);
        return res.json(todoList.rows);
      }
    } catch (err) {
      res.json(err);
    }
  }

  async deleteTodo(req, res) {
    const todoId = req.params.id;
    if (todoId === '0') {
      const deleteTodo = dataBase.query(`DELETE FROM "todo" WHERE "checked" = $1`, [true]);
      const todoList = await dataBase.query(`SELECT * FROM "todo" ORDER BY "id"`);
      return res.json(todoList.rows);
    } else {
      const deleteTodo = await dataBase.query(`DELETE FROM "todo" WHERE "id" = $1`, [todoId]);
      const todoList = await dataBase.query(`SELECT * FROM "todo" ORDER BY "id"`);
      return res.json(todoList.rows);
    }
  }
}

module.exports = new TodoController();
