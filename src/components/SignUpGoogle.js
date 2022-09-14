import { useEffect, useRef } from 'react'
import * as jose from 'jose'
import axios from 'axios'
import apiUrl from '../url'

export default function SignUpGoogle() {

    const buttonDiv = useRef(null)
    async function handleCredentialResponse(response) {
        let userObject = jose.decodeJwt(response.credential)
        console.log(userObject)
        let data = {
            name: userObject.name,
            photo: userObject.picture,
            email: userObject.email,
            pass: userObject.sub,
            role: 'user',
            from: 'google'
        }
        try {
            await axios.post(apiUrl+'auth/signup',data)
        } catch(error) {
            console.log(error)
        }        
    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '1028505588373-p2o75qn886u82uorrtoniua3h24cb3eb.apps.googleusercontent.com',
            callback: handleCredentialResponse,
            context: 'signup'
          });
          google.accounts.id.renderButton(
            buttonDiv.current,
            { theme: "outline", size: "medium", text: 'signup_with' }
          );
    }, [])

    return (
        <div ref={buttonDiv}></div>
    )

}