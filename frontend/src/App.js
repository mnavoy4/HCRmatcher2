import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AllCadidatesContainer from './Containers/AllCandidatesContainer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='main'>
          <div className='content'>
            <Route exact={true} path='/' component={AllCadidatesContainer}/>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
