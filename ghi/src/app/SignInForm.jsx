// @ts-check
import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'

export default function SignInForm(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { signin, user } = useAuthService()
    const [userError, setUserError] = useState('')
    const darkmode = props.darkmode

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    async function handleFormSubmit(e) {
        e.preventDefault()
        await signin({ username, password })
        if (!user) {
            setUserError('Sign In failed. Wrong username or password.')
        }
    }

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="row">
                <div className="offset-3 col-6">
                    <h1 className="text-center">Log In</h1>
                    <div>
                        <br></br>
                    </div>
                    {userError && (
                        <div className="alert alert-danger">{userError}</div>
                    )}
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                className={`form-control${
                                    darkmode ? ' placeholder' : ''
                                }`}
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter Username"
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                className={`form-control${
                                    darkmode ? ' placeholder' : ''
                                }`}
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" type="submit">
                                Log In
                            </button>
                        </div>
                        <br></br>
                        <div className="text-center">
                            <Link to="/signup">New user? Sign Up Here.</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
