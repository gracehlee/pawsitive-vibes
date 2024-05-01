import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react'
import useAuthService from '../hooks/useAuthService'
import { baseUrl } from '../services/authService'


export default function AllDogs(props) {
    const { user, isLoggedIn, error } = useAuthService()
    const admin = props.admin

    const [createForm, setCreateForm] = useState(false)
    const [closeForm, setCloseForm] = useState(true)

    const handleCreatePet = () => {
        setCreateForm(true)
        setCloseForm(false)
    }

    const handleCloseForm = () => {
        setCreateForm(false)
        setCloseForm(true)
    }

    // Create Pet Form
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

    const [petFormData, setPetFormData] = useState({
        pet_name: '',
        image_url: '',
        for_sale: 'false',
        price: 0,
        breed: '',
        birthday: '',
        description: '',
        owner_id: 1,
    })

    const handleInputChange = (event) => {
        setPetFormData({
            ...petFormData,
            [event.target.name]: event.target.value,
        })
    }

    async function handleFormSubmit(e) {
        e.preventDefault()

        console.log("Pet form data:", petFormData)

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

        fetchData()
        // const data = await res.json()
        // return data
    }

    // Delete Pet
       const handleRemove = async (event) => {
           event.preventDefault()
           let id = event.target.value
           console.log(id)
           const url = `${baseUrl}/api/pets/${id}`
           const fetchConfig = {
               method: 'delete',
               credentials: 'include',
               headers: {
                   'Content-Type': 'application/json',
               },
           }
           const response = await fetch(url, fetchConfig)
           if (response.ok) {
               fetchData()
           }
       }

    // Get Pets for Sale
    function handleAge(birthday) {
        var today = new Date()
        var birthDate = new Date(birthday)
        var age = today.getFullYear() - birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    function formatAge(birthday) {
        const date = birthday.split('-')
        return `${date[1]}/${date[2]}/${date[0]}`
    }

    const [saleColumns, setSaleColumns] = useState([[], [], []])
    const [petColumns, setPetColumns] = useState([[], [], []])

    const fetchData = async () => {
        const url = `${baseUrl}/api/pets`
        try {
            const response = await fetch(url, {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                const data = await response.json()

                const requests1 = []
                const requests2 = []
                for (let pet of data) {
                    let pet_id = pet.id
                    const detailUrl = `${url}/${pet_id}`
                    // pet is for sale
                    if (pet.for_sale == true) {
                        requests1.push(fetch(detailUrl))
                    } else {
                        // else not for sale
                        requests2.push(fetch(detailUrl))
                    }
                }
                const responses = await Promise.all(requests1)
                const columns = [[], [], []]
                let i = 0
                for (const petResponse of responses) {
                    if (petResponse.ok) {
                        const details = await petResponse.json()
                        columns[i].push(details)
                        i = i + 1
                        if (i > 2) {
                            i = 0
                        }
                    } else {
                        console.error(petResponse)
                    }
                }
                setPetColumns(columns)

                // Pet is not for sale
                const responses2 = await Promise.all(requests2)
                const columns2 = [[], [], []]
                let j = 0
                for (const petResponse of responses2) {
                    if (petResponse.ok) {
                        const details = await petResponse.json()
                        columns2[j].push(details)
                        j = j + 1
                        if (j > 2) {
                            j = 0
                        }
                    } else {
                        console.error(petResponse)
                    }
                }
                setSaleColumns(columns2)
            }
        } catch (e) {
            console.error(e)
        }
    }


    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="text-center">
                        <h1>Dogs</h1>
                        <br></br>
                        <h2>Puppies with Pawsitive Vibes!</h2>
                        <p>
                            All pups offered by Pawsitive Vibes will receive
                            shots, deworming and a microchip.
                            <br></br>
                            Socialized and temperament tested from day one!
                        </p>

                        {/* Create Pet */}
                        {isLoggedIn && admin && (
                            <div className="container">
                                <div className="card shadow mt-4">
                                    <div className="card-body">
                                        <h1 className="card-title text-center">
                                            Add a Pet
                                        </h1>
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
                                                        style={{
                                                            marginLeft: '15px',
                                                        }}
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
                                                        value={
                                                            petFormData.price
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="form-control"
                                                        placeholder="price"
                                                    />
                                                )}
                                                {checked && (
                                                    <label htmlFor="price">
                                                        Price
                                                    </label>
                                                )}
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
                                                <label htmlFor="pet_name">
                                                    Pet name
                                                </label>
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
                                                <label htmlFor="breed">
                                                    Breed
                                                </label>
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
                                                <label htmlFor="birthday">
                                                    Birthday
                                                </label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    required
                                                    type="text"
                                                    value={
                                                        petFormData.description
                                                    }
                                                    name="description"
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    placeholder="Description"
                                                />
                                                <label htmlFor="description">
                                                    Description
                                                </label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    required
                                                    type="text"
                                                    name="image_url"
                                                    value={
                                                        petFormData.image_url
                                                    }
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    placeholder="Image URL"
                                                />
                                                <label htmlFor="image_url">
                                                    Image URL
                                                </label>
                                            </div>


                                            <div className="text-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    name="owner_id"
                                                    value={user.id}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                        {admin && (
                            <div>
                                <br></br>
                                {createForm && (
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleCloseForm}
                                    >
                                        Close Form
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Get Pets for Sale */}
                        {/* {saleColumns[0] > 0 && */}
                        <div className="container">
                            <div className="row">
                                {saleColumns.map((pets, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="card mb-3 shadow"
                                        >
                                            <div className="card-body">
                                                <div>
                                                    <h5 className="card-title">
                                                        Name: {pets.pet_name}
                                                    </h5>
                                                </div>
                                                <img
                                                    src={pets.picture_url}
                                                    alt="Image failed to load"
                                                    className="card-img-top"
                                                />

                                                {pets.for_sale && (
                                                    <div>
                                                        <h5 className="card-subtitle">
                                                            Price: ${pets.price}
                                                        </h5>
                                                    </div>
                                                )}

                                                <div>
                                                    <h5 className="card-subtitle">
                                                        Breed: {pets.breed}
                                                    </h5>
                                                </div>

                                                {handleAge(pets.birthday) > 0 && (
                                                    <div>
                                                        <h5 className="card-subtitle">
                                                            Age:
                                                            {handleAge(
                                                                pets.birthday
                                                            )}
                                                        </h5>
                                                    </div>
                                                )}
                                                {handleAge(pets.birthday) == 0 && (
                                                    <div>
                                                        <h5 className="card-subtitle">
                                                            Born:
                                                            {formatAge(
                                                                pets.birthday
                                                            )}
                                                        </h5>
                                                    </div>
                                                )}
                                                <div>
                                                    <h5 className="card-subtitle">
                                                        Description:
                                                        {pets.description}
                                                    </h5>
                                                </div>

                                                {admin && (
                                                    <button
                                                        className="btn btn-primary"
                                                        value={pets.id}
                                                        onClick={handleRemove}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        {/* </div>} */}
                        </div>
                    </div>
                    <div className="col-md-8 offset-md-2 text-center">
                        <h2>Community Pets!</h2>
                        <p>
                            To show off your Pawsitive Pets, sign in and add to
                            our Community section
                        </p>
                    </div>


                    {/* Get Pets not for Sale */}

                        {petColumns[0] > 0 &&
                        <div className="container">
                            <div className="row">

                                {petColumns.map((pets, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="card mb-3 shadow"
                                        >
                                            <div className="card-body">
                                                <div>
                                                    <h5 className="card-title">
                                                        Name: {pets.pet_name}
                                                    </h5>
                                                </div>
                                                <img
                                                    src={pets.picture_url}
                                                    alt="Image failed to load"
                                                    className="card-img-top"
                                                />

                                                {pets.for_sale && (
                                                    <div>
                                                        <h5 className="card-subtitle">
                                                            Price: ${pets.price}
                                                        </h5>
                                                    </div>
                                                )}

                                                <div>
                                                    <h5 className="card-subtitle">
                                                        Breed: {pets.breed}
                                                    </h5>
                                                </div>

                                                {handleAge(pets.birthday) > 0 && (
                                                    <div>
                                                        <h5 className="card-subtitle">
                                                            Age:
                                                            {handleAge(
                                                                pets.birthday
                                                            )}
                                                        </h5>
                                                    </div>
                                                )}
                                                {handleAge(pets.birthday) == 0 && (
                                                    <div>
                                                        <h5 className="card-subtitle">
                                                            Born:
                                                            {formatAge(
                                                                pets.birthday
                                                            )}
                                                        </h5>
                                                    </div>
                                                )}
                                                <div>
                                                    <h5 className="card-subtitle">
                                                        Description:
                                                        {pets.description}
                                                    </h5>
                                                </div>

                                                {admin && (
                                                    <button
                                                        className="btn btn-primary"
                                                        value={pets.id}
                                                        onClick={handleRemove}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>}
                </div>
            </div>
        </main>
    )
}
