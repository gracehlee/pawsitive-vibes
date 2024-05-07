import Nav from './app/Nav'
import './css/App.css'
import './css/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import './css/darkmode.css'
import icon from './images/darkmode.png'
import light from './images/lightmode.png'
import Home from './app/Home'
import ErrorNotification from './components/ErrorNotification'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { baseUrl } from './services/authService'
import Community from './app/Community'
import SignInForm from './app/SignInForm'
import SignUpForm from './app/SignUpForm'
import SignOut from './components/SignOut'
import Services from './app/Services'
import Testimonials from './app/Testimonials'
import Dogs from './app/Dogs'
import UpdatePet from './components/UpdatePet'
import useAuthService from './hooks/useAuthService'
import Footer from './app/Footer'
import UpdateService from './components/UpdateService'
import TestimonialsList from './components/GetAllTestimonials'
import Profile from './components/Profile'
import CreateAppt from './components/CreateAppt'
import Meetups from './app/Meetups'

function App() {
    const { user, isLoggedIn } = useAuthService()
    const [admin, setAdmin] = useState(false)
    const [refresh, setRefresh] = useState(true)
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        document.body.classList.toggle('dark-mode')
    }

    useEffect(() => {
        const fetchUser = async () => {
            if (!isLoggedIn) {
                return // Don't fetch user data if user is not logged in
            }

            const user_id = user.id
            const userUrl = `${baseUrl}/api/users/${user_id}`
            try {
                const response = await fetch(userUrl, {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    const userData = await response.json()
                    setAdmin(userData.admin)
                }
            } catch (e) {
                console.error(e)
            }
        }

        if (isLoggedIn) {
            fetchUser()
        }
    }, [isLoggedIn, user, setAdmin])

    const handleSignOut = () => {
        setRefresh(!refresh)
        setAdmin(false)
    }

    return (
        <BrowserRouter>
            <div>
                <ErrorNotification />
                <Nav darkmode={darkMode} />
                <button className="toggle" onClick={toggleDarkMode}>
                    {darkMode ? (
                        <div
                            style={{
                                backgroundColor: 'grey',
                                borderRadius: '50%',
                                height: '45px',
                                width: '56px',
                                alignContent: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src={light}
                                alt="Dark Mode"
                                style={{
                                    height: '31px',
                                    width: '31px',
                                }}
                            />
                        </div>
                    ) : (
                        // Light mode
                        <div
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                height: '45px',
                                width: '56px',
                                alignContent: 'center',
                            }}
                        >
                            <img
                                src={icon}
                                alt="Light Mode"
                                style={{
                                    height: '31px',
                                    width: '31px',
                                }}
                            />
                        </div>
                    )}
                </button>
                <Routes>
                    {/* links available for public */}
                    <Route
                        path="/"
                        element={<Home darkmode={darkMode} admin={admin} />}
                    />
                    <Route path="/create-appt" element={<CreateAppt />} />
                    <Route
                        path="/meetups"
                        element={
                            <Meetups
                                key={refresh}
                                admin={admin}
                                darkmode={darkMode}
                            />
                        }
                    />
                    <Route
                        path="/pets"
                        element={
                            <Dogs
                                key={refresh}
                                admin={admin}
                                darkmode={darkMode}
                            />
                        }
                    />
                    <Route
                        path="/services"
                        element={
                            <Services
                                key={refresh}
                                admin={admin}
                                darkmode={darkMode}
                            />
                        }
                    />
                    {/* sign up / sign in / sign out */}
                    {!isLoggedIn ? (
                        <>
                            <Route
                                path="/signup"
                                element={<SignUpForm darkmode={darkMode} />}
                            />
                            <Route
                                path="/signin"
                                element={<SignInForm darkmode={darkMode} />}
                            />
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
                    {/* links available for logged in users only */}
                    {isLoggedIn ? (
                        <>
                            <Route
                                path="/community"
                                element={
                                    <Community
                                        admin={admin}
                                        darkmode={darkMode}
                                    />
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <Profile
                                        admin={admin}
                                        darkmode={darkMode}
                                    />
                                }
                            />
                            <Route
                                path="/testimonials"
                                element={
                                    <Testimonials
                                        key={refresh}
                                        admin={admin}
                                        darkmode={darkMode}
                                    />
                                }
                            />
                            <Route
                                path="/testimonials/manage"
                                element={<TestimonialsList />}
                            />
                            <Route
                                path="pets/:petId"
                                element={
                                    <UpdatePet
                                        key={refresh}
                                        admin={admin}
                                        darkmode={darkMode}
                                    />
                                }
                            />
                            <Route
                                path="/updateservice/:serviceId"
                                element={
                                    <UpdateService
                                        key={refresh}
                                        admin={admin}
                                        darkmode={darkMode}
                                    />
                                }
                            />
                            <Route
                                path="/signout"
                                element={<SignOut signout={handleSignOut} />}
                            />
                        </>
                    ) : (
                        <>
                            {/* redirects user to home page when signed out */}
                            <Route
                                path="/community"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/profile"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/testimonials"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/testimonials/manage"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="pets/:petId"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/updateservice/:serviceId"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/signout"
                                element={<Navigate to="/" />}
                            />
                        </>
                    )}
                </Routes>
                <Footer darkmode={darkMode} />
            </div>
        </BrowserRouter>
    )
}

export default App
