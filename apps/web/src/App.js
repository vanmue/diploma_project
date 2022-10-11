import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss';
import Header from './Components/Header/Header';
import Main from './pages/Main';
import Error from './Components/Error';
import Contacts from './Components/Contacts/Contacts';
import RecordingToMaster from './pages/recording-to-master';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <hr />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="recording" element={<RecordingToMaster />} />
          <Route path="*" element={< Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
