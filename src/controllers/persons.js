// persons route module
const express = require("express");
const router = express.Router();
const People = require("../models/people")

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1,
        show: true
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2,
        show: true
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3,
        show: true
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4,
        show: true
    }
];

router.get('/', (request, response) => {
    People.find().then((result) => {
        response.json(result);
    });
})

router.get('/info', (request, response) => {
    response.send(`<p>PhoneBook has info for ${persons.length} people.</p><br/><p>${new Date().toString()}</p>`)
})

router.get('/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(x => x.id === id);
    if(person){
        response.json(person);
    }else{
        response.status(404).end();
    }
})

router.delete('/:id', (request, response) => {
    People.deleteOne({ _id: request.params.id}).then(() => {
        console.log("successfully deleted")
        response.status(204).end();
    });
});

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

router.post('/', (request, response) => {
    const body = request.body;
    console.log(body);

    if(!body.name || !body.number){
        return response.status(400).json({
        error: 'name or number missing'
        })
    }

    if(persons.find(x => x.name === body.name)){
        return response.status(400).json({
        error: 'name must be unique'
        })
    }

    const person = new People({
        name: body.name,
        number: body.number,
        show: true
    })

    person.save().then(savedPerson => {
        response.json(savedPerson);
    });
})

router.put('/:id', (request, response) => {
    const note = request.body;
    console.log(note);
    persons = persons.map(n => n.id === note.id ? note : n);
    response.json(note);
})

module.exports = router;