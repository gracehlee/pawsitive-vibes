import 'bootstrap/dist/css/bootstrap.css'
import SellPetForm from '../components/SellPetForm'
import { useState } from 'react'
import useAuthService from '../hooks/useAuthService'

function Dogs() {
    const { isLoggedIn } = useAuthService()

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

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2 text-center">
                        <h1>Dogs</h1>
                        <br></br>
                        <h2>Puppies with Pawsitive Vibes!</h2>
                        <p>
                            All pups offered by Pawsitive Vibes will
                            receive shots, deworming and a microchip.
                            <br></br>
                            Socialized and temperament tested from
                            day one!
                        </p>

                        {/* change isLoggedIn to user.admin = True ??*/}
                        {isLoggedIn && (
                            <div>
                                {createForm && <SellPetForm />}
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

                        {/* if  */}
                        {/* pups != 0, display pups here */}

                        <p>List of Puppies Go Here</p>

                        {/* else: */}
                        {/* <p>
                                No puppies are currently available. Contact us with
                                questions or for more information.
                            </p> */}

                        {isLoggedIn && (
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
                    </div>
                    <div className="col-md-8 offset-md-2 text-center">
                        <h2>Community Pets!</h2>
                        <p>To show off your Pawsitive Pets, sign in and add to our Community section</p>
                        <p>Any pets adde by users will go here</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dogs
