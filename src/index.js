const express = require('express')
const cors = require('cors');
const app = express()
const PORT = "3001";
const notesRouter = require('./controllers/notes');
const personsRouter = require('./controllers/persons');

//middleware 
app.use(cors());
app.use(express.json());
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger);

//router
app.get('/', (request, response) => {
  response.send('<h1>This is an express.js server.</h1>')
})

//routers in controllers
app.use('/api/notes', notesRouter);
app.use('/api/persons', personsRouter);

//middleware after routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}
app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})