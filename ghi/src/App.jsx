import Nav from './app/Nav'
import './css/App.css'
import Home from './app/Home'
import ErrorNotification from './components/ErrorNotification'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { baseUrl } from './services/authService'
import Community from './app/Community'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import SignOut from './components/SignOut'
import Services from './app/Services'
import Testimonials from './app/Testimonials'
import Dogs from './app/Dogs'
import useAuthService from './hooks/useAuthService'
import Footer from './app/Footer'

function App() {
    const { user, isLoggedIn } = useAuthService()
    const [admin, setAdmin] = useState(false)
    const [refresh, setRefresh] = useState(true)

    const fetchUser = async () => {
        if (user) {
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
    }

    useEffect(() => {
        fetchUser()
        console.log(user)
    })

    const handleSignOut = () => {
        setRefresh(!refresh)
    }

    return (
        <BrowserRouter>
            <div>
                <ErrorNotification />
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/dogs"
                        element={<Dogs key={refresh} admin={admin} />}
                    />
                    <Route
                        path="/services"
                        element={<Services key={refresh} admin={admin} />}
                    />
                    <Route
                        path="/testimonials"
                        element={<Testimonials key={refresh} admin={admin} />}
                    />
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
                            <Route
                                path="/signout"
                                element={<SignOut signout={handleSignOut} />}
                            />
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
