import './App.css';
import Home from "./Components/Home";
import CreateYourOwnQuiz from "./Components/CreateYourOwnQuiz";
import QuizUrl from "./Components/QuizUrl";
import GetUserQuiz from "./Components/GetUserQuiz";
import {Route} from 'react-router-dom'; 

 

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Home}></Route> 
      <Route exact path='/Home' component={Home}></Route> 
      <Route exact path='/Quiz/CreateQuiz' component={CreateYourOwnQuiz}></Route> 
      <Route exact path='/Quiz/GetQuizUrl' component={QuizUrl}></Route> 
      <Route exact path='/Quiz/GiveQuizTest/:CreatorName/:QuizUniqueIdentifier' component={GetUserQuiz}></Route>

 
    </div>
  );
}

export default App;
