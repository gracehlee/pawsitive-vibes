// @ts-check
import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'

export default function SignInForm(props) {
    const { signup, user } = useAuthService()
    const darkmode = props.darkmode
    const PV_EMAIL = import.meta.env.VITE_PV_EMAIL

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
    const [userError, setUserError] = useState('')

    const handleInputChange = (event) => {
        let { name, value } = event.target
        setUserFormData({
            ...userFormData,
            [name]: value,
        })
    }

    // Regex Validators

    const validateUsername = (username) => {
        const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z\d]{5,}$/
        return usernameRegex.test(username)
    }

    const validatePassword = (password) => {
        const passwordRegex = new RegExp(
            '^(?=.*[a-z])' + // At least one lowercase letter
                '(?=.*[A-Z])' + // At least one uppercase letter
                '(?=.*\\d)' + // At least one digit
                '(?=.*[!@#$%^&*()_+])' + // At least one special character
                '[A-Za-z\\d!@#$%^&*()_+]{8,}$' // Allowed characters and length
        )
        return passwordRegex.test(password)
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    // formats phone number
    const validatePhoneNumber = (phoneNumber) => {
        const cleanPhoneNo = phoneNumber.replace(/\D/g, '')

        if (cleanPhoneNo.length !== 10 && cleanPhoneNo.length !== 11) {
            setUserError('Please enter a valid phone number.')
            return false
        }

        let formatPhoneNo // ###-###-####
        if (cleanPhoneNo.length === 11) {
            formatPhoneNo = cleanPhoneNo
                .substring(1) // remove area code prefix
                .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
        } else {
            formatPhoneNo = cleanPhoneNo.replace(
                /(\d{3})(\d{3})(\d{4})/,
                '$1-$2-$3'
            )
        }

        setUserFormData({
            ...userFormData,
            phone_number: formatPhoneNo,
        })

        return true
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        setUserError('')

        if (!validateUsername(userFormData.username)) {
            setUserError(
                'Username must be 5 or more characters ' +
                    'and must contain at least one letter.'
            )
            return
        }

        if (
            !validateEmail(userFormData.email) ||
            userFormData.email.toLowerCase() === PV_EMAIL
        ) {
            setUserError('Please enter a valid email address.')
            return
        }
        if (!validatePhoneNumber(userFormData.phone_number)) {
            setUserError('Please enter a valid phone number.')
            return
        }
        if (!validatePassword(userFormData.password)) {
            setUserError(
                'Passwords must be at least 8 characters ' +
                    'and include at least one uppercase, ' +
                    'lowercase, digit, and special character.'
            )
            return
        }

        if (userFormData.password !== confirmPassword) {
            setUserError("Passwords don't match!")
            return
        }

        const lowercaseUsername = userFormData.username.toLowerCase()
        const lowercaseEmail = userFormData.email.toLowerCase()

        setUserFormData({
            ...userFormData,
            username: lowercaseUsername,
            email: lowercaseEmail,
        })

        await signup(userFormData)
        if (!user) {
            setUserError('Sign up failed. Please check username or email.')
        }
    }

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="container">
                <div className="row">
                    <h1 className="text-center">Create an Account</h1>
                    <div>
                        <br></br>
                    </div>
                    {userError && (
                        <div className="alert alert-danger">{userError}</div>
                    )}
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                required
                                type="text"
                                className={`form-control${
                                    darkmode ? ' placeholder' : ''
                                }`}
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
                                className={`form-control${
                                    darkmode ? ' placeholder' : ''
                                }`}
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
                                className={`form-control${
                                    darkmode ? ' placeholder' : ''
                                }`}
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
                                className={`form-control${
                                    darkmode ? ' placeholder' : ''
                                }`}
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
                                className={`form-control${
                                    darkmode ? ' placeholder' : ''
                                }`}
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
                                className={`form-control${
                                    darkmode ? ' placeholder' : ''
                                }`}
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
                                className={`form-control${
                                    darkmode ? ' placeholder' : ''
                                }`}
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
