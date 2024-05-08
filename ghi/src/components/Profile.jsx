import 'bootstrap/dist/css/bootstrap.css'
import { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'
import { baseUrl } from '../services/authService'
import corgi from '../images/dogs/Corgi.png'
import PetList from './GetUserPets'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import about from '../images/assets/p1.png'

function Profile(props) {
    const { isLoggedIn, user } = useAuthService()
    const darkmode = props.darkmode
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        bio: '',
    })

    const navigate = useNavigate()
    const handleNavigate = (event) => {
        event.preventDefault()
        navigate('/createpet')
    }

    useEffect(() => {
        if (isLoggedIn) {
            const fetchUserInfo = async () => {
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
                        setUserData({
                            name: `${userData.first_name} ${userData.last_name}`,
                            username: userData.username,
                            bio: userData.bio,
                        })
                    }
                } catch (e) {
                    console.error(e)
                }
            }
            fetchUserInfo()
        }
    }, [isLoggedIn, user])

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <img
                                src={corgi}
                                alt="community"
                                className="community-image card-img-top"
                                style={{
                                    borderRadius: '10px',
                                    maxHeight: '200px',
                                    maxWidth: '200px',
                                    marginTop: '2rem',
                                    marginBottom: '2rem',
                                    alignSelf: 'center',
                                }}
                            />
                        </div>
                        <div className="text-center">
                            <button
                                className="btn btn-primary"
                                style={{ background: 'green ' }}
                            >
                                Update Picture
                            </button>
                            <span> </span>
                        </div>
                        <br></br>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3 form-control">
                            <div
                                className="card-body"
                                style={{ maxWidth: '100%' }}
                            >
                                <h5 className="card-title">
                                    <b>User:</b> {userData.username}
                                </h5>
                                <p className="card-text">
                                    <b>Name:</b> {userData.name}
                                </p>
                                <p className="card-text">
                                    <b>Bio:</b> {userData.bio}
                                    <img
                                        src={about}
                                        alt="profile"
                                        className=""
                                        style={{
                                            maxHeight: 'auto',
                                            maxWidth: '100%',
                                        }}
                                    />
                                </p>
                                <p> </p>
                                <Link
                                    className="fontcolor"
                                    to="/profile/update"
                                >
                                    <button
                                    className="btn btn-primary"
                                    style={{ background: 'green ' }}
                                >
                                        Update Profile
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoggedIn && (
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h2>My Pets</h2>
                            <button
                                className="btn btn-primary"
                                style={{ background: 'green ' }}
                                onClick={handleNavigate}
                            >
                                Add a dog
                            </button>
                            <PetList />
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Profile
