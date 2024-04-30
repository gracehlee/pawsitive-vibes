import 'bootstrap/dist/css/bootstrap.css'
import ServiceForm from '../components/CreateService'
import { useState } from 'react'
import useAuthService from '../hooks/useAuthService'
import ServiceList from '../components/ServiceList'

function Services() {
    // later this isLoggedIn logic should be replaced with
    // logic to check for admin status instead.
    const { isLoggedIn } = useAuthService()

    const [createForm, setCreateForm] = useState(false)
    const [closeForm, setCloseForm] = useState(true)
    const [pollService, setPollService] = useState(false)

    const handleCreateService = () => {
        setCreateForm(true)
        setCloseForm(false)
        setPollService(true)
    }

    const handleCloseForm = () => {
        setCreateForm(false)
        setCloseForm(true)
        setPollService(false)
    }

    return (
        <main>
            <div className="row">
                <div className="text-center">
                    <ServiceList poll={pollService} />

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

                    <div>
                        <br></br>
                        {createForm && isLoggedIn && (
                            <button
                                className="btn btn-secondary"
                                onClick={handleCloseForm}
                            >
                                Close Form
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Services
