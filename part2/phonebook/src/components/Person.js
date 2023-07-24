const Person = ({persons, handleDelete}) => (

        persons.map(person => {
            return (
            <>
                <p>{person.name} {person.number}</p>
                <button value={person.id} onClick={handleDelete}>delete</button>
            </>
            )
        })
    
        )
export default Person