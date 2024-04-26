import 'bootstrap/dist/css/bootstrap.css'
import CreatePetForm from '../components/CreatePet'
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
                        <p>Dogs go here!</p>
                        {isLoggedIn && (
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

export default Dogs
