const express = require('express');
const todoRouter = require('./routes/route');
const cors = require('cors');
const port = 8000;

const app = express();
app.use(express.json());

app.use(cors());

app.use('/api/v1', todoRouter);

app.listen(port, () => console.log(`server started on port ${port}`));
