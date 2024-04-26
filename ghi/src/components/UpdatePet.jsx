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
        owner_id: null,
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
                price: '',
            })
        } else {
            setPetFormData({
                ...petFormData,
                for_sale: 'true',
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

        setPetFormData({
            ...petFormData,
            owner_id: user.id,
        })

        console.log(petFormData)

        const res = await fetch(`${baseUrl}/api/pets/${pet_id}`, {
            method: 'put',
            credentials: 'include',
            body: JSON.stringify(petFormData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!res.ok) {
            throw new Error('Could not update pet')
        }
        const data = await res.json()
        return data
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
                    name="image_url"
                    value={petFormData.image_url}
                    onChange={handleInputChange}
                    placeholder="Image URL (Optional)"
                />
                <label htmlFor="image_url">Image URL</label>
                <input
                    type="checkbox"
                    checked={checked}
                    onClick={handleChange}
                    placeholder="For Sale?"
                />
                <label htmlFor="for_sale">For Sale?</label>

                {checked && (
                    <input
                        type="text"
                        name="price"
                        value={petFormData.price}
                        onChange={handleInputChange}
                        placeholder="price"
                    />
                )}
                <label htmlFor="price">Price</label>

                <button type="submit">Submit</button>
            </div>
        </form>
    )
}
