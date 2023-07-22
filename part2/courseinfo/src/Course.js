const Header = ({ course }) => <h1>{course}</h1>

const Total = ({sum}) => (<b>total of {sum.reduce((a, b) => a + b)} exercises</b>)

const Part = ({name, exercises}) => 
  <p>
    {name} {exercises}
  </p>

const Content = ({ parts }) => {
  return (
      parts.map(part => (<Part key={part.id} name={part.name} exercises={part.exercises}/>))
  )
}

const Course = ({course}) => {

  //Define array
  const exerciseArray = []

  //Loop and place the objets in the array
  for(let num of course.parts){
    exerciseArray.push(num.exercises)
  }

  return (
    <>
      <Header key={course.id} course={course.name} />
      <Content parts={course.parts}/>
      <Total sum={exerciseArray}/>
    </>
  )
}

export default Course