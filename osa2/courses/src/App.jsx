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

  const Course = ({ course }) => {
    return (
      <div>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
      </div>
    )
  }
  const Header = ({ courseName }) => <h1>{courseName}</h1>

  const Content = ({ parts }) => {
    console.log('parts ', parts)
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  const Part = ({ name, exercises }) => {
    return <p>{name} {exercises}</p>
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App