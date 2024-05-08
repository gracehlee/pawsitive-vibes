import { useEffect, useState } from 'react'
import { baseUrl } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import handleAge from '../components/handleAge'
import handleFormatDate from '../components/handleFormatDate'

export default function PetList(props) {
    const admin = props.admin
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
                    // pet is for sale
                    // pet is for sale
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
                                              Born:{' '}
                                              {handleFormatDate(pets.birthday)}
                                          </h5>
                                      </div>
                                  )}
                                  <div>
                                      <h5 className="card-subtitle">
                                          Description: {pets.description}
                                      </h5>
                                  </div>

                                  <div className="text-center"></div>
                                  <br></br>
                                  <div className="text-center">
                                      {admin && (
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
                                      {admin && (
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
