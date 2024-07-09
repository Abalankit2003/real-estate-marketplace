import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path = "/" element = {<Home />}></Route>
        <Route path = "/sign-in" element = { <SignIn /> }> </Route>
        <Route path = "/profile" element = {<Profile />}></Route>
        <Route path = "/sign-out" element = { <SignOut />}></Route>
        <Route path = "/about" element = {<About />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
