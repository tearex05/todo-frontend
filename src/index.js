import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import TodoDetail from './pages/TodoDetail'
import Signup from './pages/Signup'
import Login from './pages/Login'
import {BrowserRouter as R, Route, Routes} from 'react-router-dom'
import Nav from './components/Nav.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <R>
    <Nav />
        <Routes>
            <Route path='/todo-frontend' exact element={<App />} />
            <Route path='/signup' exact element={<Signup />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/todo/:id' element={<TodoDetail />} />
        </Routes>
    </R>
    </>
);