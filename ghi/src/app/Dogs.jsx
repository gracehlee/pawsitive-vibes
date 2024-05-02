import 'bootstrap/dist/css/bootstrap.css'
import '../css/index.css'
import CreatePetForm from '../components/CreatePetForm'
import GetAllPets from '../components/GetAllPets'
import GetPetsForSale from '../components/GetPetsForSale'
import { useState } from 'react'
import useAuthService from '../hooks/useAuthService'

export default function Dogs(props) {
    const { isLoggedIn } = useAuthService()
    const admin = props.admin

    const [createForm, setCreateForm] = useState(false)
    const [closeForm, setCloseForm] = useState(true)
    const [pollDog, setPollDog] = useState(false)

    const handleCreatePet = () => {
        setCreateForm(true)
        setCloseForm(false)
        setPollDog(true)
    }

    const handleCloseForm = () => {
        setCreateForm(false)
        setCloseForm(true)
        setPollDog(false)
    }

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="text-center">
                        <h1>Puppies with Pawsitive Vibes!</h1>
                        <p>
                            All pups offered by Pawsitive Vibes will receive
                            shots, deworming and a microchip.
                            <br></br>
                            Socialized and temperament tested from day one!
                        </p>
                        <div>{<GetPetsForSale admin={admin} />}</div>

                        {isLoggedIn && admin && (
                            <div>
                                {createForm && <CreatePetForm admin={admin} />}
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

                        <div>
                            <br></br>
                            {createForm && admin && isLoggedIn && (
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleCloseForm}
                                >
                                    Close Form
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col-md-8 offset-md-2 text-center">
                        <h2>Community Pets!</h2>
                        <p>
                            To show off your Pawsitive Pets, sign in and add to
                            our Community section.
                        </p>
                    </div>

                    <div>{<GetAllPets admin={admin} />}</div>
                </div>
            </div>
        </main>
    )
}
