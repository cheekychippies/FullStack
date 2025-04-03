const App = () => {
  const course = 'Half Stack application development'

  const parts = [
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


  const Header = ({ course }) => {
    return (
      <div>
        <h1>{course}</h1>
      </div>
    )
  }

  const Part = ({ name, excercise }) => {
    return (
      <div>
        <p>{name} {excercise}</p>
      </div>
    )
  }
  const Content = ({ parts }) => {
    return (
      <div>
        < Part name={parts[0].name} excercise={parts[0].exercises} />
        < Part name={parts[1].name} excercise={parts[1].exercises} />
        < Part name={parts[2].name} excercise={parts[2].exercises} />
      </div>
    )

  }
  const Total = ({ parts }) => {
    console.log(parts)


    return (
      <div>
        <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App