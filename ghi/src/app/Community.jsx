import 'bootstrap/dist/css/bootstrap.css'
import CreatePetForm from '../components/CreatePetForm'
import { useState } from 'react'
import useAuthService from '../hooks/useAuthService'

function Community() {
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
                        <h1>Community</h1>
                        <p>Community content goes here!</p>
                        <p>ie. Profile content</p>
                        <p>ie. Edit Profile content (Profile form) </p>
                        <p>
                            We might want to move the CreatePetForm to the Edit
                            Profile form component later.
                        </p>
                        <p>
                            We will need to remove the fields -for sale- and
                            -price-
                        </p>
                        <p>From this particular Pet Form.</p>
                        {isLoggedIn && (
                            <div>
                                {createForm && <CreatePetForm />}
                                {closeForm && (
                                    <button
                                        className="btn btn-dark"
                                        onClick={handleCreatePet}
                                    >
                                        Add a Pet
                                    </button>
                                )}
                            </div>
                        )}
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
                </div>
            </div>
        </main>
    )
}

export default Community
