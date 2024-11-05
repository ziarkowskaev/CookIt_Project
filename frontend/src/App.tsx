import { useQuery } from '@apollo/client';
import { ALL_PERSONS } from './queries';
import Home from './pages/home/Home';
import Recipe from './pages/Recipe';
import './App.css';

const App = () => {
  const result = useQuery(ALL_PERSONS);
  console.log(result);

  if (result.loading) {
    return <div>loading...</div>;
  }

  // return (
  //   <div>
  //     <Home/>
  //       Hello
  //       {result.data && result.data.allPersons && result.data.allPersons.map(person => (
  //         <div key={person.id}>{person.name}</div>
  //       ))}
  // </div>

  // )

  return (
    <div>
      {/* <Home/> */}
      <Recipe />
    </div>
  );
};

export default App;
