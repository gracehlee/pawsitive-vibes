import 'bootstrap/dist/css/bootstrap.css'
import '../css/index.css'
import GetAllPets from '../components/GetAllPets'
import GetPetsForSale from '../components/GetPetsForSale'
import { useNavigate } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'

export default function Dogs(props) {
    const admin = props.admin
    const { isLoggedIn } = useAuthService()
    const darkmode = props.darkmode
    const navigate = useNavigate()

    const handleNavigate = (event) => {
        event.preventDefault()
        navigate('/createpet')
    }

    const scroll = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="text-center">
                <h1 name="puppies">Puppies with Pawsitive Vibes!</h1>
                <br />
                <label htmlFor="puppies">
                    All pups offered by Pawsitive Vibes will receive shots,
                    deworming and a microchip.
                </label>
                <br />
                <label htmlFor="puppies">
                    Socialized and temperament tested from day one!
                </label>
                <br />
                <br />
                <button
                    className="btn btn-primary text-center"
                    style={{
                        cursor: 'pointer',
                        background: darkmode ? 'black' : 'green',
                        color: darkmode ? 'white' : '',
                    }}
                >
                    <span onClick={() => scroll('footer')}>
                        Interested in a dog?
                    </span>
                </button>
                <br />
                <br />

                {admin && isLoggedIn && (
                    <button
                        className="btn btn-primary"
                        style={{
                            background: darkmode ? 'black' : 'green',
                            color: darkmode ? 'white' : '',
                        }}
                        onClick={handleNavigate}
                    >
                        Add a dog
                    </button>
                )}
                <div>{<GetPetsForSale admin={admin} />}</div>
            </div>
            <br></br>
            <div className="col-md-8 offset-md-2 text-center">
                <h2 name="community">Community Pets!</h2>
                <br />
                <label htmlFor="community">
                    To show off your Pawsitive Pets, sign in and add to our
                    Community section.
                </label>
            </div>
            <div>{<GetAllPets admin={admin} />}</div>
        </main>
    )
}
