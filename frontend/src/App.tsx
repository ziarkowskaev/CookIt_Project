import { useQuery } from '@apollo/client'
import { ALL_PERSONS } from './queries'
import Home from './pages/home/Home'
import Category from './pages/categories/Category'
// import "./App.css"
import { NavigationMenuApp } from './pages/categories/NavigationBar'
const App = () => {
  const result = useQuery(ALL_PERSONS)
  console.log(result)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div className='flex flex-col w-screen h-screen'>
      <div className='flex w-screen'>
        <NavigationMenuApp/>
      </div>
       {/* <Category/> */}
        <Home/>
         
          {result.data && result.data.allPersons && result.data.allPersons.map(person => (
            <div key={person.id}>{person.name}</div>
          ))}
    </div>
      
  
  )
}

export default App