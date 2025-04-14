const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            <Header courseName={course.name} />
            <Content courseParts={course.parts} />
            <p><strong>Total exercises: {totalExercises}</strong></p>
        </div>
    )
}

const Header = ({ courseName }) => <h1>{courseName}</h1>

const Content = ({ courseParts }) => (
    <div>
        {courseParts.map(part => (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
    </div>
)

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

export default Course