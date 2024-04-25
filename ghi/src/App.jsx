import Nav from './app/Nav'
import './App.css'
import Home from './app/Home'
import ErrorNotification from './components/ErrorNotification'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import SignOut from './components/SignOut'
import CreatePetForm from './components/CreatePetForm'
import ServiceForm from './components/ServiceForm'


function App() {
    return (
        <BrowserRouter>
            <div>
                <ErrorNotification />
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pets" element={<CreatePetForm />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/signin" element={<SignInForm />} />
                    <Route path="/signout" element={<SignOut />} />
                    <Route path="/serviceform" element={<ServiceForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
