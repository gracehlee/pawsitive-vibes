// @ts-check
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'

export default function SignInForm() {
    const { signup, user, error } = useAuthService()

    const [userFormData, setUserFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        bio: '',
    })

    const handleInputChange = (event) => {
        setUserFormData({
            ...userFormData,
            [event.target.name]: event.target.value,
        })
    }

    async function handleFormSubmit(e) {
        e.preventDefault()

        await signup(userFormData)

        const usernameUpdate = await fetch(`${baseUrl}/api/auth/signup`, {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(userFormData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!usernameUpdate.ok) {
            throw new Error('Could not create new user')
        }
        const data = await usernameUpdate.json()
        return data
    }

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="shadow p-4 mt-4">
                        <h1>Create an account</h1>
                        <form onSubmit={handleFormSubmit}>
                            {error && (
                                <div className="error">{error.message}</div>
                            )}
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    value={userFormData.username}
                                    onChange={handleInputChange}
                                    placeholder="Enter Username"
                                    name="username"
                                />
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    value={userFormData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter Password"
                                />
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    value={userFormData.first_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter first name"
                                />
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    value={userFormData.last_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter last name"
                                />
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={userFormData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    name="phone_number"
                                    id="phone_number"
                                    value={userFormData.phone_number}
                                    onChange={handleInputChange}
                                    placeholder="Enter phone number"
                                />
                            </div>
                            <button type="submit">Sign Up!</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
