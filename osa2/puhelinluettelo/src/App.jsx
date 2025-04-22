import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  })

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      //id: String(persons.length + 1)
    }
    if (!persons.some(person => person.name === newName)) {

      personService
        .create(personObject)
        .then(retunedPerson => {
          setPersons(persons.concat(retunedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('Error adding person:', error)
          alert('Failed to add the person to the server.')
        })

    } else {
      alert(`${newName} is already added to phonebook`)
    }

  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilterName(event.target.value)
  }
  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Error deleting person: ', error)
          alert(`Failed to delete ${personToDelete.name} from the server.`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={filterName}
        handleFilterChange={handleFilterChange}
      />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterName={filterName}
        handleDelete={handleDelete}
      />
    </div>
  )

}

export default App