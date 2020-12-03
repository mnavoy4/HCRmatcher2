import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import AllCadidatesContainer from './Containers/AllCandidatesContainer';
import AllJobsContainer from './Containers/AllJobsContainer';
import 'fontsource-roboto'
import AddCandidateContainer from './Containers/AddCandidateContainer/AddCandidateContainer';
import SingleCandidateContainer from './Containers/SingleCandidateContainer'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='main'>
          <div className='content'>
            <Route exact={true} path='/' component={AllCadidatesContainer}/>
            <Route path='/jobs' component={AllJobsContainer} />
            <Route path='/add-candidate' component={AddCandidateContainer}/>
            <Route path='/candidate/:id' component={SingleCandidateContainer}/>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
