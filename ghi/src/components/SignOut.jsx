import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthService from '../hooks/useAuthService'

function SignOut() {
    const navigate = useNavigate()
    const { signout } = useAuthService()

    useEffect(() => {
        async function handleSignout() {
            await signout()
            navigate('/')
        }
        handleSignout()
    }, [navigate, signout])
    return null
}

export default SignOut
