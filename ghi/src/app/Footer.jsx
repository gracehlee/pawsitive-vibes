import 'bootstrap/dist/css/bootstrap.css'
import '../css/index.css'
import FB_Logo from '../images/FB_Logo.png'
import IG_Logo from '../images/IG_Logo.png'


// const [shown, setShown] = useState(false)

// const handleChange = () => {
//     setShown(!shown)
// }

export default function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-dark text-white">
            <div className="container text-center">
                <h3>Contact Us</h3>
                <a
                    href="https://www.facebook.com/people/Pawsitive-Vibes-Dog-Training-LLC/100083097112386/"
                    target="_blank"
                >
                    <img src={FB_Logo} height="30" />
                </a>
                <a
                    href="https://www.instagram.com/pawsitive_vibes_dt/"
                    target="_blank"
                >
                    <img src={IG_Logo} height="30" />
                </a>
                <br></br>
                PawsitiveVibesColorado@Gmail.com
            </div>
            <div>
                <p>"Contact Us" Form goes here</p>
            </div>
        </footer>
    )
}
