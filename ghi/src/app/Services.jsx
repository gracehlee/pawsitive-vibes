import 'bootstrap/dist/css/bootstrap.css'
import ServiceForm from '../components/ServiceForm'
import { useState } from 'react'
import useAuthService from '../hooks/useAuthService'

function Services() {
    // later this isLoggedIn logic should be replaced with
    // logic to check for admin status instead.
    const { isLoggedIn } = useAuthService()

    const [createForm, setCreateForm] = useState(false)
    const [closeForm, setCloseForm] = useState(true)

    const handleCreateService = () => {
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
                        <h1>Services</h1>
                        <p>Services go here!</p>
                        {isLoggedIn && (
                            <div>
                                {createForm && <ServiceForm />}
                                {closeForm && (
                                    <button
                                        className="btn btn-dark"
                                        onClick={handleCreateService}
                                    >
                                        Add Service
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

export default Services
