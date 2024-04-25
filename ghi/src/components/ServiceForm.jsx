import React, { useState } from 'react';
import { baseUrl } from '../services/authService';
import useAuthService from '../hooks/useAuthService';

function ServiceForm() {
    const { user, error } = useAuthService()

    const [serviceFormData, setServiceFormData] = useState({
        service: '',
        picture_url: '',
        duration: '',
        cost: '',
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

    console.log('Service form data:', serviceFormData)

    
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
            // if (res.ok) {
            //     setServiceFormData({
            //         service: '',
            //         picture_url: '',
            //         duraction: '',
            //         cost: '',
            //     })
            // }

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
            }

            const data = await res.json()
            setServiceFormData({
                service: '',
                picture_url: '',
                duration: '',
                cost: '',
            })
            return data
        } catch (error) {
            console.error(error) 
            throw error 
        }
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Service</h1>
                    <form onSubmit={handleSubmit} id="create-service-form">
                        {error && <div className="error">{error.message}</div>}
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
                                type="text"
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
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ServiceForm;