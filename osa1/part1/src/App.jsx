const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = ({ course }) => {
    // console.log(course.name)
    return (
      <h1>{course.name}</h1>
    )
  }

  const Part = ({ name, exercises }) => {
    console.log(name, exercises)
    return (
      <p>{name} {exercises}</p>
    )
  }

  const Content = ({ course }) => {
    console.log()
    return (
      <div>
        {course.parts.map((part, i) => (
          <Part key={i} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    )
  }

  const Total = ({ course }) => {
    console.log()
    //const totalExercises = course.parts.reduce((sum, part ) => sum + part.exercises, 0)
    let totalExercises = 0
    for (let i = 0; i < course.parts.length; i++) {
      totalExercises += course.parts[i].exercises
    }

    return (
      <div>
        <p>Number of exercises {totalExercises}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App