import 'bootstrap/dist/css/bootstrap.css'
import CreatePetForm from '../components/CreatePetForm'
import { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'
import { baseUrl } from '../services/authService'
import corgi from '../images/dogs/Corgi.png'
import PetList from './GetAllPets'

function Profile(props) {
    const { isLoggedIn, user } = useAuthService()
    const darkmode = props.darkmode
    const [createForm, setCreateForm] = useState(false)
    const [closeForm, setCloseForm] = useState(true)
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        bio: '',
    })

    const handleCreatePet = () => {
        setCreateForm(true)
        setCloseForm(false)
    }

    const handleCloseForm = () => {
        setCreateForm(false)
        setCloseForm(true)
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
                            <button className="btn btn-danger">
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
                                    User: {userData.username}
                                </h5>
                                <p className="card-text">
                                    Name: {userData.name}
                                </p>
                                <p className="card-text">
                                    Bio: {userData.bio} Lorem Ipsum is simply
                                    dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industrys
                                    standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of
                                    type and scrambled it to make a type
                                    specimen book. It has survived not only five
                                    centuries, but also the leap into electronic
                                    typesetting, remaining essentially
                                    unchanged. It was popularised in the 1960s
                                    with the release of Letraset sheets
                                    containing Lorem Ipsum passages, and more
                                    recently with desktop publishing software
                                    like Aldus PageMaker including versions of
                                    Lorem Ipsum.
                                </p>
                                <p> </p>
                                <button className="btn btn-danger">
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoggedIn && (
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>My Pets</h1>
                            <h3>This is where list of pets go.</h3>
                            <p>
                                <PetList />
                            </p>
                            {createForm && <CreatePetForm />}
                            {closeForm && (
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleCreatePet}
                                >
                                    Add a Pet
                                </button>
                            )}
                            <br />
                            {createForm && (
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleCloseForm}
                                >
                                    Close Form
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Profile
