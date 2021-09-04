import './App.css';
import Home from "./Components/Home";
import ErrorBoundry from "./Components/ErrorBoundry";
import CreateYourOwnQuiz from "./Components/CreateYourOwnQuiz";
import QuizUrl from "./Components/QuizUrl";
import GetUserQuiz from "./Components/GetUserQuiz";
import TwoDaysHoroscope from "./Components/TwoDaysHoroscope";
import {Route} from 'react-router-dom'; 

 

function App() {
  return (
    <div className="App">
      <ErrorBoundry>
      <Route exact path='/' component={Home}></Route> 
      <Route exact path='/Home' component={Home}></Route> 
      <Route exact path='/Quiz/CreateQuiz' component={CreateYourOwnQuiz}></Route> 
      <Route exact path='/Quiz/GetQuizUrl' component={QuizUrl}></Route> 
      <Route exact path='/Quiz/GiveQuizTest/:CreatorName/:QuizUniqueIdentifier' component={GetUserQuiz}></Route>
      <Route exact path='/Horoscope/FindHoroscopeDetails' component={TwoDaysHoroscope}></Route>
      </ErrorBoundry>

 
    </div>
  );
}

export default App;
