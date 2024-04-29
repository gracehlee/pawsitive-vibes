// @ts-check
import { useState } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'

export default function SellPetForm() {
    const { user, error } = useAuthService()

    const [petFormData, setPetFormData] = useState({
        pet_name: '',
        image_url: '',
        for_sale: 'true',
        price: '',
        breed: '',
        birthday: '',
        description: '',
        owner_id: user.id,
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

        console.log(petFormData)

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
        <div className="service-form">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="card-title text-center">
                            Add a dog to sell
                        </h1>
                        <br></br>
                        <form onSubmit={handleFormSubmit}>
                            {error && (
                                <div className="alert alert-danger">
                                    {error.message}
                                </div>
                            )}

                            {/*  */}

                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="number"
                                    min="0"
                                    max="10000"
                                    name="price"
                                    value={petFormData.price}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="price"
                                />
                                <label htmlFor="price">Price</label>
                            </div>

                            {/*  */}

                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    value={petFormData.pet_name}
                                    name="pet_name"
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Pet name"
                                />
                                <label htmlFor="pet_name">Pet name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    value={petFormData.breed}
                                    name="breed"
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Breed"
                                />
                                <label htmlFor="breed">Breed</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="date"
                                    value={petFormData.birthday}
                                    name="birthday"
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Birthday"
                                />
                                <label htmlFor="birthday">Birthday</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    value={petFormData.description}
                                    name="description"
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Description"
                                />
                                <label htmlFor="description">Description</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    name="image_url"
                                    value={petFormData.image_url}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Image URL"
                                />
                                <label htmlFor="image_url">Image URL</label>
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
