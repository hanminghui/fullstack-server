// notes route module
const express = require("express");
const router = express.Router();
const Note = require('../models/notes')

router.get('/', (request, response) => {
    Note.find().then(result => {
        response.json(result)
      })
})

router.get('/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
        if(note){
            response.json(note);
        }else{
            response.status(404).end();
        }
    })
    .catch(error => next(error));
})

router.delete('/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
    .then(() => {
        response.status(204).end();
    })
    .catch(error => next(error));
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

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    note.save().then(savedNote => {
        response.json(savedNote);
    });
})

router.put('/:id', (request, response, next) => {
    const body = request.body;

    const note = {
      content: body.content,
      important: body.important,
    }
  
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote);
      })
      .catch(error => next(error));
})

module.exports = router;