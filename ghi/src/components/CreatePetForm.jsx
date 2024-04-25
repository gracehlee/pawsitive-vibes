// @ts-check
import { useState } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'

export default function SignInForm() {
    const { user, error } = useAuthService()

    const [petFormData, setPetFormData] = useState({
        pet_name: '',
        image_url: '',
        for_sale: '',
        price: '',
        owner_id: '',
    })

    const handleInputChange = (event) => {
        setPetFormData({
            ...petFormData,
            [event.target.name]: event.target.value,
        })
    }

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */

    async function handleFormSubmit(e) {
        e.preventDefault()

        petFormData.owner_id = user.id.toString()
        // if for_sale is checked, petFormData.for_sale = true?

        const res = await fetch(`${baseUrl}/api/pets`, {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(petFormData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!res.ok) {
            throw new Error('Could not create new pet')
        }
        const data = await res.json()
        return data
    }

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="card shadow">
                            <div className="card-body">
                                <h1 className="card-title text-center">
                                    Create a Pet
                                </h1>
                                <form onSubmit={handleFormSubmit}>
                                    {error && (
                                        <div className="alert alert-danger">
                                            {error.message}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <input
                                            required
                                            type="text"
                                            value={petFormData.pet_name}
                                            name="pet_name"
                                            onChange={handleInputChange}
                                            className="form-control"
                                            placeholder="Enter Pet Name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={petFormData.image_url}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            placeholder="Enter Image URL (Optional)"
                                        />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            value={petFormData.for_sale}
                                            onChange={handleInputChange}
                                            className="form-check-input"
                                            id="for_sale"
                                        />
                                        <label
                                            htmlFor="for_sale"
                                            className="form-check-label"
                                        >
                                            For Sale?
                                        </label>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            required
                                            type="text"
                                            value={petFormData.price}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            placeholder="Enter Price"
                                        />
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
            </div>
        </main>
    )
}
