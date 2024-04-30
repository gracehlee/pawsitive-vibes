import 'bootstrap/dist/css/bootstrap.css'
import CreatePetForm from '../components/CreatePetForm'
import GetAllPets from '../components/GetAllPets'
import GetPetsForSale from '../components/GetPetsForSale'
import { useState, useEffect } from 'react'
import useAuthService from '../hooks/useAuthService'
import { baseUrl } from '../services/authService'


function Dogs() {
    const { user } = useAuthService()
    const [admin, setAdmin] = useState(false)

    const fetchUser = async () => {
        if (user) {
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
                    setAdmin(userData.admin)
                }
            } catch (e) {
                console.error(e)
            }
        }
    }

    const [createForm, setCreateForm] = useState(false)
    const [closeForm, setCloseForm] = useState(true)

    const handleCreatePet = () => {
        setCreateForm(true)
        setCloseForm(false)
    }

    const handleCloseForm = () => {
        setCreateForm(false)
        setCloseForm(true)
    }
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="text-center">
                        <h1>Dogs</h1>
                        <br></br>
                        <h2>Puppies with Pawsitive Vibes!</h2>
                        <p>
                            All pups offered by Pawsitive Vibes will receive
                            shots, deworming and a microchip.
                            <br></br>
                            Socialized and temperament tested from day one!
                        </p>

                        {/* change admin to user.admin = True ??*/}
                        {admin && (
                            <div>
                                {createForm && <CreatePetForm />}
                                {closeForm && (
                                    <button
                                        className="btn btn-dark"
                                        onClick={handleCreatePet}
                                    >
                                        Add a Dog
                                    </button>
                                )}
                            </div>
                        )}
                        {admin && (
                            <div>
                                <br></br>
                                {createForm && (
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleCloseForm}
                                    >
                                        Close Form
                                    </button>
                                )}
                            </div>
                        )}
                    <div>{<GetPetsForSale />}</div>
                    </div>
                    <div className="col-md-8 offset-md-2 text-center">
                        <h2>Community Pets!</h2>
                        <p>
                            To show off your Pawsitive Pets, sign in and add to
                            our Community section
                        </p>
                    </div>

                    <div>{<GetAllPets />}</div>

                </div>
            </div>
        </main>
    )
}

export default Dogs
