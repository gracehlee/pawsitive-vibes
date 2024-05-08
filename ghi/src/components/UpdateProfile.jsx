// @ts-check
import { useState, useEffect } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'
import { Link } from 'react-router-dom'

export default function UpdateProfile(props) {
    const { isLoggedIn, user, error } = useAuthService()
    const darkmode = props.darkmode
    const id = user.id
    const url = `${baseUrl}/api/users/${id}`
    const [userError, setUserError] = useState('')
    const [userSuccess, setUserSuccess] = useState('')

    const [profile, setProfile] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        admin: false,
        bio: '',
    })

    const [userData, setUserData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        admin: false,
        bio: '',
    })

    useEffect(() => {
        if (isLoggedIn) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(url, {
                        method: 'get',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    if (response.ok) {
                        const userData = await response.json()
                        if (userData.admin) {
                            setUserData({
                                username: userData.username,
                                first_name: userData.first_name,
                                last_name: userData.last_name,
                                email: userData.email,
                                phone_number: userData.phone_number,
                                admin: true,
                                bio: userData.bio,
                            })
                        } else {
                            setUserData({
                                username: userData.username,
                                first_name: userData.first_name,
                                last_name: userData.last_name,
                                email: userData.email,
                                phone_number: userData.phone_number,
                                admin: false,
                                bio: userData.bio,
                            })
                        }
                    }
                } catch (e) {
                    console.error(e)
                }
            }
            fetchUser()
        } else {
            setUserData({
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                admin: false,
                bio: '',
            }) // reset with logout
        }
    }, [isLoggedIn, user, url])

    useEffect(() => {
        setProfile({
            username: userData.username,
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone_number: userData.phone_number,
            admin: userData.admin,
            bio: userData.bio,
        })
    }, [userData]) // update with user input

    const handleInputChange = (event) => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(url, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            })
            if (response.ok) {
                setUserSuccess('Profile updated successfully')
                setProfile({
                    username: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_number: '',
                    admin: false,
                    bio: '',
                })
            } else {
                setUserError('Error updating profile.')
            }
        } catch (error) {
            setUserError(`Error updating profile: ${error}`)
        }
    }

    return (
        <>
            <main className={`${darkmode ? ' darkmode' : ''}`}>
                <div className="container">
                    <h1 className="text-center ">Update Profile</h1>
                </div>
                <div className="offset-3 col-6">
                    <br />
                    {userError && (
                        <div className="alert alert-danger">{userError}</div>
                    )}
                    {userSuccess && (
                        <div className="alert alert-success">{userSuccess}</div>
                    )}
                    {error && (
                        <div className="alert alert-danger">
                            {error.message}
                        </div>
                    )}
                    <form
                        className="profile-form"
                        id="profile-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-floating mb-3">
                            <input
                                required
                                type="text"
                                className={`form-control${
                                    darkmode ? ' placeholder' : ''
                                }`}
                                name="first_name"
                                id="first_name"
                                value={profile.first_name}
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
                                value={profile.last_name}
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
                                name="bio"
                                id="bio"
                                value={profile.bio}
                                onChange={handleInputChange}
                                placeholder="Bio"
                            />
                            <label htmlFor="bio">Bio</label>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary" style={{ background: "green" }}>
                                Submit
                            </button>
                        </div>
                        <br></br>
                    </form>
                    <div className="text-center">
                        <Link className="fontcolor" to="/profile">
                            <button className="btn btn-primary">
                                Back to Profile
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
