import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import './css/App.css'
import './css/darkmode.css'
import './css/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import icon from './images/darkmode.png'
import light from './images/lightmode.png'
import Community from './app/Community'
import CreateAppt from './components/CreateAppt'
import CreateMeetups from './components/CreateMeetups'
import CreatePetForm from './components/CreatePetForm'
import CreateService from './components/CreateService'
import ErrorNotification from './components/ErrorNotification'
import Footer from './app/Footer'
import GetAllTestimonials from './components/GetAllTestimonials'
import Home from './app/Home'
import Meetups from './app/Meetups'
import Nav from './app/Nav'
import Pets from './app/Pets'
import Profile from './components/Profile'
import Services from './app/Services'
import SignInForm from './app/SignInForm'
import SignUpForm from './app/SignUpForm'
import SignOut from './components/SignOut'
import Testimonials from './app/Testimonials'
import UpdateMeetups from './components/UpdateMeetups'
import UpdatePet from './components/UpdatePet'
import UpdateProfile from './components/UpdateProfile'
import UpdateProfilePic from './components/UpdateProfilePic'
import UpdateService from './components/UpdateService'
import useAuthService from './hooks/useAuthService'
import { baseUrl } from './services/authService'
import { useState, useEffect } from 'react'

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
                            <Pets
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
                                path="/create-appt"
                                element={<CreateAppt />}
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
                                path="/profile/update"
                                element={
                                    <UpdateProfile
                                        admin={admin}
                                        darkmode={darkMode}
                                    />
                                }
                            />
                            <Route
                                path="/profile/updatepic"
                                element={
                                    <UpdateProfilePic darkmode={darkMode} />
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
                                element={
                                    <GetAllTestimonials darkmode={darkMode} />
                                }
                            />
                            <Route
                                path="/meetups/create"
                                element={
                                    <CreateMeetups
                                        key={refresh}
                                        admin={admin}
                                        darkmode={darkMode}
                                    />
                                }
                            />
                            <Route
                                path="/meetups/:id"
                                element={
                                    <UpdateMeetups
                                        key={refresh}
                                        admin={admin}
                                        darkmode={darkMode}
                                    />
                                }
                            />
                            <Route
                                path="/createpet"
                                element={
                                    <CreatePetForm
                                        key={refresh}
                                        admin={admin}
                                        darkmode={darkMode}
                                    />
                                }
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
                                path="/createservice"
                                element={
                                    <CreateService
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
                                path="/create-appt"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/profile"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/profile/update"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/profile/updatepic"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/meetups/create"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/meetups/:id"
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
                                path="/createpet"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/createservice"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/updateservice/:serviceId"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/profile/update"
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
