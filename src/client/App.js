import React from 'react';
import './App.css';
import MealsList from './MealsList';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import MealsList from "./components/MealsList";
// import TestComponent from "./components/TestComponent/TestComponent";
// import { response } from "../backend/app";


function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/whatsUpp" element ={<MealsList />} />
        </Routes>
      </div>
      </Router>
  );
}

// function App() {
//   return (
//     <Router>
//       <Switch>
//       <Route exact path="/">
//         <p>adsasdas</p>
//       </Route>
//       <Route exact path="/lol">
//         <p>hELLO LUCAS</p>
//       </Route>
//       <Route exact path="/test-component">
//         <TestComponent></TestComponent>
//       </Route>
//       </Switch>
//     </Router>
//   );
// }

// function App() {
//     return (
//       <div className="App">
//         <h1>DAasdasdas</h1>
//         <MealsList />
//       </div>
//     );
//   }
// }

export default App;
