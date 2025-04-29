const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')


morgan.token('body', (req) => { return req.method === 'POST' ? JSON.stringify(req.body) : '' })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
let persons = [
    {
        name: "Arto Hellas",
        number: "23423",
        id: "1"
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: "2"
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: "3"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    //console.log('id is ', id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
}
)

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)
    response.json(person)
})

const generateId = () => {
    let newId
    do {
        newId = String(Math.floor(Math.random() * 100000))
    } while (persons.find(person => person.id === newId))
    return newId
}

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})
app.get('/api/info', (request, response) => {
    const lkm = persons.length
    const date = new Date()
    response.send(`
        <p>Phonebook has info for ${lkm} people</p>
        <p>${date}</p>
        `)
})
const PORT = 3001
app.listen(PORT)
console.log(`Server running on porti ${PORT}`)