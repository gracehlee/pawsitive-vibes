import { useEffect, useState } from 'react'
import { baseUrl } from '../services/authService'
import { Link } from 'react-router-dom'


export default function SaleList(props) {
    const admin = props.admin

    const [petColumns, setPetColumns] = useState([[], [], []])

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
                const requests = []
                for (let pet of data) {
                    let pet_id = pet.id
                    // pet is not for sale
                    if (pet.for_sale == true) {
                        const detailUrl = `${url}/${pet_id}`
                        requests.push(fetch(detailUrl))
                    }
                }
                const responses = await Promise.all(requests)
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
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleRemove = async (event) => {
        event.preventDefault()
        let id = event.target.value
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

    function PetColumn(props) {
        return (
            <div className="col">
                {props.list.map((pets, index) => {
                    return (
                        <div key={index} className="card mb-3 shadow">
                            <img
                                src={pets.picture_url}
                                alt="Image failed to load"
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <div>
                                    <h5 className="card-title">
                                        Name: {pets.pet_name}
                                    </h5>
                                </div>

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
                                            Age: {handleAge(pets.birthday)}
                                        </h5>
                                    </div>
                                )}
                                {handleAge(pets.birthday) == 0 && (
                                    <div>
                                        <h5 className="card-subtitle">
                                            Born: {formatAge(pets.birthday)}
                                        </h5>
                                    </div>
                                )}
                                <div>
                                    <h5 className="card-subtitle">
                                        Description: {pets.description}
                                    </h5>
                                </div>
                                {admin && (
                                    <div className="btn btn-primary">
                                        <Link to={`${pets.id}`}>
                                            <button type="button">Edit</button>
                                        </Link>
                                    </div>
                                )}

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
        )
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    {petColumns.map((petList, index) => {
                        return (
                            <PetColumn
                                key={index}
                                list={petList}
                                handleRemove={handleRemove}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
