import { useQuery } from '@apollo/client'
import { ALL_PERSONS } from './queries'

const App = () => {
  const result = useQuery(ALL_PERSONS)
  console.log(result)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
        Hello
        {result.data && result.data.allPersons && result.data.allPersons.map(person => (
          <div key={person.id}>{person.name}</div>
        ))}
  </div>
  
  )
}

export default App