// @ts-check
import { useState } from 'react'
// import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'

export default function ContactForm() {
    const { error } = useAuthService()

    const [contactFormData, setContactFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleInputChange = (event) => {
        setContactFormData({
            ...contactFormData,
            [event.target.name]: event.target.value,
        })
    }

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */

    // this will be 3rd party API info here

    // async function handleFormSubmit(e) {
    //     e.preventDefault()

    //     const res = await fetch(`${baseUrl}/api/pets`, {
    //         method: 'post',
    //         credentials: 'include',
    //         body: JSON.stringify(petFormData),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     if (!res.ok) {
    //         throw new Error('Could not create new pet')
    //     }
    //     const data = await res.json()
    //     return data
    // }

    return (
        <div className="contact-form">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="card-title text-center">Contact Us</h1>
                        <br></br>
                        <form>
                            {/* <form onSubmit={handleFormSubmit}> */}
                            {error && (
                                <div className="alert alert-danger">
                                    {error.message}
                                </div>
                            )}
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    value={contactFormData.name}
                                    name="name"
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Name"
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
