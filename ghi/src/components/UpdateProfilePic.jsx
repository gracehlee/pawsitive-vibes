import { useState } from 'react'
import { baseUrl } from '../services/authService'
import useAuthService from '../hooks/useAuthService'
import { Link } from 'react-router-dom'

function UpdateProfilePic(props) {
    const darkmode = props.darkmode
    const [file, setFile] = useState(null)
    const { user, error } = useAuthService()
    const id = user.id
    const [userError, setUserError] = useState('')
    const [userSuccess, setUserSuccess] = useState('')

    const handleFileInputChange = (event) => {
        setFile(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('file_upload', file)

        const fileName = `${id}.png`

        formData.append('filename', fileName)

        try {
            const endpoint = `${baseUrl}/upload/`
            const response = await fetch(endpoint, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })

            if (response.ok) {
                setUserError('')
                setUserSuccess('File uploaded successfully!')
            } else {
                setUserSuccess('')
                setUserError('Failed to upload a file.')
            }
        } catch (error) {
            setUserSuccess('')
            setUserError(`Error updating profile picture: ${error}`)
        }
    }

    return (
        <main className={`${darkmode ? ' darkmode' : ''}`}>
            <div className="text-center">
                <h1>Upload Profile Picture</h1>
                <br />
                <br />
                <div className="error">
                    {userError && (
                        <div className="alert alert-danger">{userError}</div>
                    )}
                    {userSuccess && (
                        <div className="alert alert-success">{userSuccess}</div>
                    )}
                    {error && (
                        <div className="alert alert-danger">
                            {error.message}
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            marginBottom: '20px',
                            marginLeft: '200px',
                            textAlign: 'center',
                        }}
                    >
                        <input
                            type="file"
                            name={id}
                            accept=".jpeg, .png, .jpg"
                            onChange={handleFileInputChange}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        style={{ background: 'green' }}
                        type="submit"
                    >
                        Upload {file && <span>{file.name}</span>}
                    </button>
                </form>
                <div className="text-center">
                    <br />
                    <br />
                    <Link className="fontcolor" to="/profile">
                        <button className="btn btn-primary">
                            Back to Profile
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default UpdateProfilePic
