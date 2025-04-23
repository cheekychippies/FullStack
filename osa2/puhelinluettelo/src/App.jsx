import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


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
    }

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              `Succesfully edited ${existingPerson.name}'s phonenumber`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.error('Error updating person:', error)
            alert(`Failed to update ${newName}'s number on the server.`)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          console.log(returnedPerson.name)
          setErrorMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error('Error adding person:', error)
          alert('Failed to add the person to the server.')
        })
    }
  }


  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setErrorMessage(
            `Successfully deleted ${personToDelete.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error('Error deleting person: ', error)
          alert(`Failed to delete ${personToDelete.name} from the server.`)
        })
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


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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