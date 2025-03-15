// ** React Imports
import {useEffect, useState} from 'react'

// ** Styles
import {useAppAuth} from "../../hype/contexts/AppAuthContext";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import consoleLogo from '../../assets/notywatch_logo.png'
const PageAuth = () => {
    // ** Hooks
    const authContext = useAppAuth()
    const navigate = useNavigate()
    const [errorMessages, setErrorMessages] = useState<string>();
    //     source = logo
    const params = new URLSearchParams(window.location.search)
    const token = params.get('code')
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        if (token) {
            setIsReady(true);
        }
    }, [token]);
    async function exchangeCodeForToken(code: string) {
        // token url from env
        const tokenUrl = import.meta.env.VITE_AUTH_TOKEN_URL;
        try {
            const response = await axios.post(tokenUrl, {
                code: code,
                redirectUri: authContext.redirectUri
            }, {
                headers : {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error exchanging code for token:', JSON.stringify(error));
            throw error;
        }
    }
    useEffect(() => {
        // Example usage:
        if (isReady && token && !authContext.isAuthenticated ) {
            console.log('Token:', token);
            exchangeCodeForToken(token).then(data => {
                console.log('Token response data:', data);
                authContext.setAuth(data.access_token, data.refresh_token, data.id_token);
                // Store the tokens securely, e.g., in localStorage or sessionStorage
            }).catch(error => {
                console.error('Error:', error);
                setErrorMessages(error.message);
            });
        }
    }, [token, isReady, authContext.isAuthenticated]);

    useEffect(() => {
        if (authContext.isAuthenticated) {
            navigate('/notywatch-console/device-manage', {replace: true})
        }
    }, [authContext.isAuthenticated, navigate]);

    return (
        <div className={'pt-5'}>
            <Row>
                <Col sm={4}></Col>
                <Col sm={4}>
                    <div>
                        <img
                            style={{width: '100%'}}
                            src={consoleLogo}/>
                    </div>
                    <div className={'mt-4'}>
                        {
                            authContext.isAuthenticated ? (
                                <div>
                                    <h1 className={'text-center'}>Authenticated 😄
                                    </h1>
                                </div>
                            ) : (
                                <div>
                                    <h1>
                                        {errorMessages ? 'Something went wrong 😥' : 'Please wait...'}
                                    </h1>
                                    {
                                        errorMessages && (
                                            <div>
                                                <h3>Error:</h3>
                                                <p>{errorMessages}</p>
                                                <Link to={'/'}>Go to login page</Link>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </Col>
                <Col sm={4}></Col>
            </Row>

        </div>
    )
}

export default PageAuth
