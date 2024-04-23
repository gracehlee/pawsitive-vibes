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
            [event.target.name]: event.target.value
        })
    }

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */

    async function handleFormSubmit(e) {
        e.preventDefault()
        let username =  userFormData.username
        let password = userFormData.password
        await signup({ username, password })

        // Get id from fetch request + username
        const usernameFetch = await fetch(`${baseUrl}/api/users`, {
            method: 'get',
            credentials: 'include',
        })
        if (!usernameFetch.ok) {
            throw new Error('Could not create user')
        }

        let id
        const usernameData = await usernameFetch.json()
        for (let user of usernameData) {
            if (user == username) {
                id = user.id
                return id
            }
        }

        // Username and password exist, updating other fields
        const usernameUpdate = await fetch(`${baseUrl}/api/users/${id}`, {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(userFormData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!usernameUpdate.ok) {
            // TODO update failed, delete user by id
            throw new Error('Could not create new user')
        }
        const data = await usernameUpdate.json()
        return data
    }

    if (user) {
        return <Navigate to="/" />
    }

    // TODO form not rendering properly, import CSS?
    // Copied form from Car-Car
    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="shadow p-4 mt-4">
                        <h1>Create and account</h1>
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
                                />
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    name="password"
                                    value={userFormData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter Password"
                                />
                                <label htmlFor="password">Password</label>
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
                                <label htmlFor="first_name">First name</label>
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
                                <label htmlFor="last_name">Last name</label>
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
                                <label htmlFor="email">Email</label>
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
                                <label htmlFor="phone_number">
                                    Phone number
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name="bio"
                                    id="bio"
                                    value={userFormData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Enter bio (optional)"
                                />
                                <label htmlFor="bio">
                                    Bio: about you (optional)
                                </label>

                                <button type="submit">Sign Up!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
