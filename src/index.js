const express = require('express')
const cors = require('cors');
const app = express()
const PORT = "3001";
const notesRouter = require('./controllers/notes');

app.use(cors());
app.use(express.json());
  
app.get('/', (request, response) => {
response.send('<h1>This is an express.js server.</h1>')
})

app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})