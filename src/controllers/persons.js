// persons route module
const express = require("express");
const router = express.Router();
const People = require("../models/people")

router.get('/', (request, response) => {
    People.find().then((result) => {
        response.json(result);
    });
})

router.get('/info', (request, response) => {
    response.send(`<p>PhoneBook has info for ${persons.length} people.</p><br/><p>${new Date().toString()}</p>`)
})

router.get('/:id', (request, response, next) => {
    People.findById(request.params.id).then(note => {
        if(note){
            response.json(note);
        }else{
            response.status(404).end();
        }
    })
    .catch(error => next(error));
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

    const person = new People({
        name: body.name,
        number: body.number,
        show: true
    })

    person.save().then(savedPerson => {
        response.json(savedPerson);
    });
})

router.put('/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
        show: body.show
    }
  
    People.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson);
      })
      .catch(error => next(error));
})

module.exports = router;