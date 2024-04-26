// @ts-check
import { useState } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'

export default function SignInForm() {
    const { user, error } = useAuthService()

    const [petFormData, setPetFormData] = useState({
        pet_name: '',
        image_url: '',
        for_sale: 'false',
        price: '',
        breed: '',
        age: '',
        birthday: '',
        description: '',
        owner_id: user.id,
    })

    // add for_sale boolean
    const [checked, setChecked] = useState(false)
    const [showPrice, setShowPrice] = useState(false)

    const handleChange = (e) => {
        setChecked(!checked)
        setShowPrice(!showPrice)

        if (checked == true) {
            setPetFormData({
                ...petFormData,
                for_sale: 'false',
                price: ''
            })
        } else {
            setPetFormData({
                ...petFormData,
                for_sale: 'true'
            })
        }
    }

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

        // setPetFormData({
        //     ...petFormData,
        //     owner_id: user.id
        // })

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
                                        placeholder="Pet name"
                                    />
                                    <label htmlFor="pet_name">Pet name</label>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="image_url"
                                        value={petFormData.image_url}
                                        onChange={handleInputChange}
                                        placeholder="Image URL (Optional)"
                                    />
                                    <label htmlFor="image_url">Image URL</label>
                                </div>
                                <div className="mb-3">
                                    <input
                                        required
                                        type="text"
                                        value={petFormData.breed}
                                        name="breed"
                                        onChange={handleInputChange}
                                        placeholder="Breed"
                                    />
                                    <label htmlFor="breed">Breed</label>
                                </div>
                                <div className="mb-3">
                                    <input
                                        required
                                        type="text"
                                        value={petFormData.age}
                                        name="age"
                                        onChange={handleInputChange}
                                        placeholder="Age"
                                    />
                                    <label htmlFor="age">Age</label>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="date"
                                        value={petFormData.birthday}
                                        name="birthday"
                                        onChange={handleInputChange}
                                        placeholder="Birthday"
                                    />
                                    <label htmlFor="birthday">Birthday (Optional)</label>
                                </div>
                                <div className="mb-3">
                                    <input
                                        required
                                        type="text"
                                        value={petFormData.description}
                                        name="description"
                                        onChange={handleInputChange}
                                        placeholder="Description"
                                    />
                                    <label htmlFor="description">Description (Optional)</label>
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={handleChange}
                                        placeholder="For Sale?"
                                    />
                                    <label htmlFor="for_sale">For Sale?</label>
                                </div>
                                <div className="mb-3">
                                    {checked && (
                                        <input
                                            type="text"
                                            name="price"
                                            value={petFormData.price}
                                            onChange={handleInputChange}
                                            placeholder="price"
                                        />
                                    )}
                                    {checked && (
                                        <label htmlFor="price">Price</label>
                                    )}
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
    )
    }
