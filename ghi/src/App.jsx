import Nav from './app/Nav'
import './css/App.css'
import Home from './app/Home'
import ErrorNotification from './components/ErrorNotification'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Community from './app/Community'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import SignOut from './components/SignOut'
import Services from './app/Services'
import Testimonials from './app/Testimonials'
import Dogs from './app/Dogs'
import useAuthService from './hooks/useAuthService'
import Footer from './app/Footer'
import ServiceList from './components/ServiceList'

function App() {
    const { isLoggedIn } = useAuthService()

    return (
        <BrowserRouter>
            <div>
                <ErrorNotification />
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dogs" element={<Dogs />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/servicelist" element={<ServiceList />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    {!isLoggedIn ? (
                        <>
                            <Route path="/signup" element={<SignUpForm />} />
                            <Route path="/signin" element={<SignInForm />} />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/signup"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/signin"
                                element={<Navigate to="/" />}
                            />
                        </>
                    )}
                    {isLoggedIn ? (
                        <>
                            <Route path="/community" element={<Community />} />
                            <Route path="/signout" element={<SignOut />} />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/community"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/signout"
                                element={<Navigate to="/" />}
                            />
                        </>
                    )}
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
