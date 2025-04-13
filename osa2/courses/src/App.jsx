const App = () => {
  const course = {
    name: 'Half stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  const totalExcersises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log('total ', totalExcersises)
  const Course = ({ course }) => {
    return (
      <div>
        <Header courseName={course.name} />
        <Content courseParts={course.parts} />
        <p><strong>Total exercises: {totalExcersises}</strong></p>
      </div>
    )
  }
  const Header = ({ courseName }) => <h1>{courseName}</h1>
  const Content = ({ courseParts }) => (
    <div>
      {courseParts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <p>{ }</p>
    </div>
  )
  const Part = ({ name, exercises }) => <p>{name}{exercises}</p>

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App