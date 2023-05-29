import './App.css';
import NavBar from './pages/NavBar';
import Pins from './pages/Pins';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Single from './pages/Single';
import Edit from './pages/Edit';
import Favourites from './pages/Favourites'
import Created from './pages/Created';
import ProfileEdit from './pages/ProfileEdit';
function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route exact path="/" element={<Navigate to="/posts" />} />
    <Route exact path="/posts" element={<Pins/>} />
    <Route exact path="/posts/search" element={<Pins/>} />
    <Route exact path="/saved" element={<Favourites/>}/>
    <Route exact path="/created" element={<Created/>}/>
    <Route exact path="/login" element={<Login/>} />
    <Route exact path="/register" element={<Register/>} />
    <Route exact path="/posts/:id" element={<Single/>} />
    <Route exact path="/create" element={<Edit/>} />
    <Route exact path="/profile-edit" element={<ProfileEdit/>} />
    </Routes>
    </BrowserRouter> 
    </>
  );
}

export default App;
