// @ts-check
import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'
import '../css/signin.css'

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { signin, user, error } = useAuthService()

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    async function handleFormSubmit(e) {
        e.preventDefault()
        await signin({ username, password })
    }

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <main className="main-container">
            <div className="row">
                <div className="offset-3 col-6">
                    <h1 className="text-center">Log In</h1>
                    <div>
                        <br></br>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        {error && <div className="error">{error.message}</div>}
                        <div className="form-floating mb-3">
                            <input
                                className="form-control mb-2"
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
                                className="form-control mb-2"
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
