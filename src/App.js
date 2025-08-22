import './App.css';
import HomePage from './components/HomePage';
import ReserveTable from './components/ReserveTable'
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Nav />
      <Routes> 
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/booking" element={<ReserveTable/>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
