import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AllCadidatesContainer from './Containers/AllCandidatesContainer';
import AllJobsContainer from './Containers/AllJobsContainer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='main'>
          <div className='content'>
            <Route exact={true} path='/' component={AllCadidatesContainer}/>
            <Route path='/jobs' component={AllJobsContainer} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
