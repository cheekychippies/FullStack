const Persons = ({ persons, filterName, handleDelete }) => {
    return (
        <div>
            {persons
                .filter(person =>
                    person.name.toLowerCase().includes(filterName.toLowerCase())
                ).map(person => (
                    <div key={person.id}>{person.name} {person.number}
                    <button onClick ={() => handleDelete(person.id)}>delete</button>
                    </div>
                ))}</div>
    )

}

export default Persons