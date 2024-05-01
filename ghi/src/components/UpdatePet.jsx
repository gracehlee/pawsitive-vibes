// @ts-check
import { useState, useEffect } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'

export default function UpdatePetForm(props) {
    const { user, error } = useAuthService()
    const [admin, setAdmin] = useState(false)

    const fetchUser = async () => {
        if (user) {
            const user_id = user.id
            const userUrl = `${baseUrl}/api/users/${user_id}`
            try {
                const response = await fetch(userUrl, {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    const userData = await response.json()
                    setAdmin(userData.admin)
                }
            } catch (e) {
                console.error(e)
            }
        }
    }

    const [petFormData, setPetFormData] = useState({
        pet_name: '',
        image_url: '',
        for_sale: 'false',
        price: 0,
        breed: '',
        birthday: '',
        description: '',
        owner_id: user.id,
    })

    // add for_sale boolean
    const [checked, setChecked] = useState(false)
    const [showPrice, setShowPrice] = useState(false)

    const handleChange = () => {
        setChecked(!checked)
        setShowPrice(!showPrice)

        if (checked == true) {
            setPetFormData({
                ...petFormData,
                for_sale: 'false',
                price: 0,
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

    const res = await fetch(`${baseUrl}/api/pets/${props.id}`, {
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


    // set admin status
    useEffect(() => {
        fetchUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container">
            <div className="card shadow mt-4">
                <div className="card-body">
                    <h1 className="card-title text-center">Add a Pet</h1>
                    <br></br>
                    <form onSubmit={handleFormSubmit}>
                        {error && (
                            <div className="alert alert-danger">
                                {error.message}
                            </div>
                        )}
                        <div className="col-auto">
                            {admin && (
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={handleChange}
                                    className="form-check-input"
                                    id="for_sale"
                                />
                            )}
                            {admin && (
                                <label
                                    htmlFor="for_sale"
                                    className="form-check-label"
                                    style={{ marginLeft: '15px' }}
                                >
                                    <p>For Sale?</p>
                                </label>
                            )}
                        </div>
                        <div className="form-floating mb-3">
                            {checked && (
                                <input
                                    type="number"
                                    min="0"
                                    max="10000"
                                    name="price"
                                    value={petFormData.price}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="price"
                                />
                            )}
                            {checked && <label htmlFor="price">Price</label>}
                        </div>

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
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
