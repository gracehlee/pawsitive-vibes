import Nav from './app/Nav'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorNotification from './components/ErrorNotification'
import Home from './app/Home'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'

function App() {
    return (
        <div>
            <ErrorNotification />
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/signin" element={<SignInForm />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
