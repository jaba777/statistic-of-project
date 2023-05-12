import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';



function App() {


  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='*' element={<h1>Error Page</h1>} />
      </Routes>
     
    </div>
  );
}

export default App;
