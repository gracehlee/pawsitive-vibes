// @ts-check
import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
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

    const [confirmPassword, setConfirmPassword] = useState('')

    const handleInputChange = (event) => {
        setUserFormData({
            ...userFormData,
            [event.target.name]: event.target.value,
        })
    }

    async function handleFormSubmit(e) {
        e.preventDefault()

        if (userFormData.password !== confirmPassword) {
            alert("Passwords don't match!")
            return
        }
        await signup(userFormData)
    }

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <main>
            <div className="container">
                <div className="row">
                    <h1 className="text-center">Create an Account</h1>
                    <div>
                        <br></br>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        {error && (
                            <div className="alert alert-danger">
                                {error.message}
                            </div>
                        )}
                        <div className="form-floating mb-3">
                            <input
                                required
                                type="text"
                                className="form-control"
                                value={userFormData.username}
                                onChange={handleInputChange}
                                placeholder="Enter Username"
                                name="username"
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                required
                                type="password"
                                className="form-control"
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
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm Password"
                            />
                            <label htmlFor="confirm_password">
                                Confirm Password
                            </label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                required
                                type="text"
                                className="form-control"
                                name="first_name"
                                id="first_name"
                                value={userFormData.first_name}
                                onChange={handleInputChange}
                                placeholder="Enter First Name"
                            />
                            <label htmlFor="firstname">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                required
                                type="text"
                                className="form-control"
                                name="last_name"
                                id="last_name"
                                value={userFormData.last_name}
                                onChange={handleInputChange}
                                placeholder="Enter Last Name"
                            />
                            <label htmlFor="lastname">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                required
                                type="text"
                                className="form-control"
                                name="email"
                                id="email"
                                value={userFormData.email}
                                onChange={handleInputChange}
                                placeholder="Enter Email"
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                required
                                type="text"
                                className="form-control"
                                name="phone_number"
                                id="phone_number"
                                value={userFormData.phone_number}
                                onChange={handleInputChange}
                                placeholder="Enter Phone Number"
                            />
                            <label htmlFor="phone_number">Phone Number</label>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success">
                                Sign Up!
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <br></br>
                        <Link to="/signin">Have an account? Sign In Here.</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
