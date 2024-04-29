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
        <footer className="footer mt-auto py-3 text-white bottom">
            <div className="text-center">
                <br></br>
                <h3>Contact Us</h3>
            </div>
            <br></br>
            <div className="text-center">
                <a href="https://www.facebook.com/people/Pawsitive-Vibes-Dog-Training-LLC/100083097112386/">
                    <img src={FB_Logo} height="30" />
                </a>
                <span> </span>
                <a href="https://www.instagram.com/pawsitive_vibes_dt/">
                    <img src={IG_Logo} height="30" />
                </a>
            </div>
            <br></br>
            <div className="text-center">
                <p>PawsitiveVibesColorado@Gmail.com</p>
            </div>
            <br></br> <br></br>
            <div className="text-center">
                <p>&quot;Contact Us&quot; Form goes here</p>
            </div>
        </footer>
    )
}
