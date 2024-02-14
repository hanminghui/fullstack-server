// notes route module
const express = require("express");
const router = express.Router();

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-1-17T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      date: "2022-1-17T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-1-17T19:20:14.298Z",
      important: true
    }
];

router.get('/', (request, response) => {
    response.json(notes)
})

router.get('/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);
    if(note){
        response.json(note);
    }else{
        response.status(404).end();
    }
})

router.delete('/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
});

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

router.post('/', (request, response) => {
    const body = request.body;
    console.log(body);

    if(!body.content){
        return response.status(400).json({
        error: 'content missing'
        })
    }

    const note = {
        id: generateId(),
        content: body.content,
        date: new Date().toISOString(),
        important: Boolean(body.important) || false,
    }

    notes = notes.concat(note);
    response.json(note);
})

router.put('/:id', (request, response) => {
    const note = request.body;
    console.log(note);
    notes = notes.map(n => n.id === note.id ? note : n);
    response.json(note);
})

module.exports = router;