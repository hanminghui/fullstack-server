const express = require('express')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const notesRouter = require('./controllers/notes');
const personsRouter = require('./controllers/persons');
const screensRouter = require('./controllers/screens');
var morgan = require('morgan');

app.use(express.static('build'));

//middleware 
app.use(cors());
app.use(express.json());
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    '-','reqbody:',
    JSON.stringify(req.body)
  ].join(' ')
}));

//router
app.get('/', (request, response) => {
  response.send('<h1>This is an express.js server.</h1>')
})

//routers in controllers
app.use('/api/notes', notesRouter);
app.use('/api/persons', personsRouter);
app.use('/api/screens', screensRouter);

//middleware after routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}
app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})