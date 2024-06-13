import { useEffect, useState } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'
import { useNavigate } from 'react-router-dom'
import handleAge from '../components/handleAge'
import handleFormatDate from '../components/handleFormatDate'

export default function PetList(props) {
    const admin = props.admin
    const { user } = useAuthService()
    const navigate = useNavigate()
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
                const requests = []
                for (let pet of data) {
                    let pet_id = pet.id
                    // pet owner id == user id
                    if (pet.owner_id == user.id) {
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

    const handleEdit = async (event) => {
        let id = event.target.value
        navigate(`/pets/${id}`)
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
            window.location.reload()
        }
    }

    function PetColumn(props) {
        return (
            <div className="col">
                {props.list.map((pets, index) => {
                    return (
                        <div key={index} className="card mb-3 shadow">
                            <img
                                style={{
                                    height: '274px',
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                                src={pets.image_url}
                                alt="Image failed to load"
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <h5
                                        className="card-title"
                                        style={{
                                            marginRight: '8px',
                                            marginBottom: '0',
                                        }}
                                    >
                                        Name:
                                    </h5>
                                    <p
                                        style={{
                                            margin: '0',
                                            fontSize: '20px',
                                        }}
                                    >
                                        {pets.pet_name}
                                    </p>
                                </div>

                                {pets.for_sale && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <h5
                                            className="card-subtitle"
                                            style={{
                                                marginRight: '8px',
                                                marginBottom: '0',
                                            }}
                                        >
                                            Price:
                                        </h5>
                                        <p
                                            style={{
                                                margin: '0',
                                                fontSize: '20px',
                                            }}
                                        >
                                            ${pets.price}
                                        </p>
                                    </div>
                                )}

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <h5
                                        className="card-subtitle"
                                        style={{
                                            marginRight: '8px',
                                            marginBottom: '0',
                                        }}
                                    >
                                        Breed:
                                    </h5>
                                    <p
                                        style={{
                                            margin: '0',
                                            fontSize: '20px',
                                        }}
                                    >
                                        {pets.breed}
                                    </p>
                                </div>

                                {handleAge(pets.birthday) > 0 && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <h5
                                            className="card-subtitle"
                                            style={{
                                                marginRight: '8px',
                                                marginBottom: '0',
                                            }}
                                        >
                                            Age:
                                        </h5>
                                        <p
                                            style={{
                                                margin: '0',
                                                fontSize: '20px',
                                            }}
                                        >
                                            {handleAge(pets.birthday)}
                                        </p>
                                    </div>
                                )}
                                {handleAge(pets.birthday) === 0 && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <h5
                                            className="card-subtitle"
                                            style={{
                                                marginRight: '8px',
                                                marginBottom: '0',
                                            }}
                                        >
                                            Born:
                                        </h5>
                                        <p
                                            style={{
                                                margin: '0',
                                                fontSize: '20px',
                                            }}
                                        >
                                            {handleFormatDate(pets.birthday)}
                                        </p>
                                    </div>
                                )}
                                <br />
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <h5
                                        className="card-subtitle"
                                        style={{
                                            marginRight: '8px',
                                            marginBottom: '0',
                                        }}
                                    >
                                        Description:
                                    </h5>
                                </div>
                                <p
                                    style={{
                                        margin: '0',
                                        fontSize: '20px',
                                    }}
                                >
                                    {pets.description}
                                </p>

                                <div className="text-center"></div>
                                <br></br>
                                <div className="text-center">
                                    {!admin && (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            value={pets.id}
                                            onClick={handleEdit}
                                            style={{
                                                margin: '10px',
                                                background: 'green',
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {!admin && (
                                        <button
                                            className="btn btn-primary"
                                            value={pets.id}
                                            onClick={handleRemove}
                                            style={{ background: 'red' }}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
