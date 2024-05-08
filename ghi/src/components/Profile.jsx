import 'bootstrap/dist/css/bootstrap.css'
import { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'
import { baseUrl } from '../services/authService'
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

    const [profileImage, setProfileImage] = useState(null)

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

    useEffect(() => {
        const fetchProfileImage = async () => {
            const id = user.id
            try {
                const response = await fetch(
                    `${baseUrl}/profile_image/${id}?timestamp=${Date.now()}`
                )
                if (response.ok) {
                    const imageData = await response.blob()
                    setProfileImage(URL.createObjectURL(imageData))
                } else {
                    console.error('Failed to fetch profile image')
                }
            } catch (error) {
                console.error('Error fetching profile image:', error)
            }
        }
        fetchProfileImage()
    }, [isLoggedIn, user])

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-4">
                        <div className={`mb-3${darkmode ? ' darkmode' : ''}`}>
                            <img
                                src={profileImage}
                                alt="community"
                                className="card-img-top"
                                style={{
                                    borderRadius: '10px',
                                    objectFit: 'cover',
                                    height: '400px',
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className=" mb-3">
                            <div className="card-body">
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
                                <Link
                                    className="fontcolor"
                                    to="/profile/updatepic"
                                >
                                    <button
                                        className="btn btn-primary"
                                        style={{ background: 'green ' }}
                                    >
                                        Update Picture
                                    </button>
                                </Link>
                                <span> </span>
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
                            <PetList />

                            <button
                                className="btn btn-primary"
                                onClick={handleNavigate}
                            >
                                Add a Pet
                            </button>

                            <br />
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Profile
