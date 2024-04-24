// @ts-check
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
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

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <form onSubmit={handleFormSubmit}>
            {error && <div className="error">{error.message}</div>}
            <div className="form-floating mb-3">
                <input
                    required
                    type="text"
                    value={petFormData.pet_name}
                    name="pet_name"
                    onChange={handleInputChange}
                    placeholder="Pet name"
                />
                <label htmlFor="pet_name">Pet name</label>
                    <input
                    type="text"
                    value={petFormData.image_url}
                    onChange={handleInputChange}
                    placeholder="Image URL (Optional)"
                />
                <label htmlFor="image_url">Image URL</label>
                    <input
                    required
                    type="checkbox"
                    value={petFormData.for_sale}
                    onChange={handleInputChange}
                    placeholder="For Sale?"
                />
                <label htmlFor="for_sale">For Sale?</label>
                    <input
                    required
                    type="text"
                    value={petFormData.price}
                    onChange={handleInputChange}
                    placeholder="price"
                />
                <label htmlFor="price">Price</label>


                <button type="submit">Submit</button>
            </div>
        </form>
    )
}
