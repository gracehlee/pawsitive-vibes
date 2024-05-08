import { useState } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'
import { useNavigate } from 'react-router-dom'


function ServiceForm(props) {
    const darkmode = props.darkmode
    const { error } = useAuthService()
    const [showMessage, setShowMessage] = useState(false)
    const navigate = useNavigate()


    const [serviceFormData, setServiceFormData] = useState({
        service: '',
        picture_url: '',
        description: '',
        duration: 0,
        cost: '',
        calendly_url: '',
    })

    const handleInputChange = (e) => {
        setServiceFormData({
            ...serviceFormData,
            [e.target.name]: e.target.value,
        })
    }

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const res = await fetch(`${baseUrl}/api/services`, {
                method: 'post',
                credentials: 'include',
                body: JSON.stringify(serviceFormData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) {
                const errorData = await res.json()
                if (errorData && errorData.errors) {
                    const errorMessage = errorData.errors
                        .map((error) => error.message)
                        .join(', ')
                    throw new Error(`Validation Error: ${errorMessage}`)
                } else {
                    throw new Error('Could not create service')
                }
            } else {
                setShowMessage(true)
            }

            const data = await res.json()
            setServiceFormData({
                service: '',
                picture_url: '',
                description: '',
                duration: '',
                cost: '',
                calendly_url: '',
            })

            return data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    const handleNavigate = (event) => {
        event.preventDefault()
        navigate('/services')
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="service-form">
                <div className="text-center offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Service</h1>
                        {showMessage && (
                            <div className="alert alert-success" role="alert">
                                Service successfully added
                            </div>
                        )}

                        <form onSubmit={handleSubmit} id="create-service-form">
                            {error && (
                                <div className="error">{error.message}</div>
                            )}
                            <div className="form-floating mb-3">
                                <input
                                    value={serviceFormData.service}
                                    onChange={handleInputChange}
                                    placeholder="Service Name"
                                    required
                                    type="text"
                                    name="service"
                                    id="service"
                                    className="form-control"
                                ></input>
                                <label htmlFor="service">Service</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    value={serviceFormData.picture_url}
                                    onChange={handleInputChange}
                                    placeholder="picture URL"
                                    required
                                    type="text"
                                    name="picture_url"
                                    id="picture_url"
                                    className="form-control"
                                ></input>
                                <label htmlFor="picture_url">Image URL</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    value={serviceFormData.duration}
                                    onChange={handleInputChange}
                                    placeholder="duration"
                                    required
                                    type="number"
                                    name="duration"
                                    id="duration"
                                    className="form-control"
                                ></input>
                                <label htmlFor="duration">Duration</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    value={serviceFormData.cost}
                                    onChange={handleInputChange}
                                    placeholder="cost"
                                    required
                                    type="text"
                                    name="cost"
                                    id="cost"
                                    className="form-control"
                                ></input>
                                <label htmlFor="cost">Cost</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    value={serviceFormData.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                    required
                                    type="text"
                                    maxLength="100"
                                    name="description"
                                    id="description"
                                    className="form-control"
                                ></input>
                                <label htmlFor="description">Description</label>
                            </div>
                            <div className="form-floating mb-3">
                            <input
                                value={serviceFormData.calendly_url}
                                onChange={handleInputChange}
                                placeholder="Calendly URL"
                                required
                                type="url"
                                name="calendly_url"
                                id="calendly_url"
                                className="form-control"
                            ></input>
                            <label htmlFor="calendly_url">Calendly Link</label>
                        </div>
                        <button
                                className="btn btn-primary"
                                style={{ margin: '10px' }}
                                onClick={handleNavigate}
                            >
                                Back
                            </button>
                            <button
                                className="btn btn-primary"
                                style={{ background: 'green' }}
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ServiceForm
