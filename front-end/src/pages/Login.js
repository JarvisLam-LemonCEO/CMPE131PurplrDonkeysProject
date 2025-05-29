import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
// import React, { Component } from 'react';
import React, {useState} from 'react';
import "./login.css"
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';


// class Login extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			email: '',
// 			password: '',
// 		};
// 	}
// }

const Login = (props) => {
    const [popupStyle, showPopup] = useState("hide");
    const [guestStyle, showGuestPopup] = useState("hide"); /* for testing purposes, you would replace this with a redirct to the chatbot  */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    
    
    const popup = () => {
        showPopup("login-popup");
        setTimeout(() => showPopup("hide"), 3000);
    }

    async function login() {
        const body = {
            "email": email,
            "password": password
        }
        let hashedPassword = hash(password);
        const x = await axios.post('http://localhost:5000/api/handleLogin/', {}, {params: {email: email, password: hashedPassword}});
        console.log(x.data);
        if (x.data) {
            await setLoggedIn(true);
        }
        else {
            await setLoginError(true);
        }
        props.setUid(x.data); 
    }

    async function guest() {
        const x = await axios.post('http://localhost:5000/api/makeGuest/', {}, {});
        props.setUid(x.data);
    }


    /*Code added 10/29/2022*/
    const changeEmail = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
    }
    
    /*Code added 10/29/2022*/
    const changePassword = (event) => {
        console.log(event.target.value);
        setPassword(event.target.value);

    }

    function hash(string) {
        var hash = 0;
        if (string.length == 0) return hash;
        for (let x = 0; x < string.length; x++) {
            let ch = string.charCodeAt(x);
            hash = ((hash << 5) - hash) + ch;
            hash = hash & hash;
        }
        return hash;
    }

    

    return (
        <div data-testid="bg" className="background">
        <div data-testid="cvr" className="cover">
            <h1>Login</h1>

            {
                loginError ? (
                    <div style={{color: "red"}}>
                    <h3>Login Failed</h3>
                    </div>  
                ) : (
                    <></>
                )
            }   
            <div className={guestStyle}>
            <h3>You are a Guest! Redirecting to main page...</h3>
            </div>

            <div htmlFor="Email">Email:</div>
            <input type="text" placeholder="Email" onChange={(event)=>setEmail(event.target.value)} required/>
            
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="Password" onChange={(event)=> setPassword(event.target.value)} required/>
            

            <div className="login-btn" onClick={login}>Login</div>
            <div className="guest-btn" onClick={guest}><Link className="link" to="/messageboard">Continue as Guest</Link> </div>
            <div className="guest-btn" ><Link className="link" to="/signup">Register</Link></div>

            {
                loggedIn ? (
                    <Navigate to="/messageboard"/>
                ) : (
                    <p></p>
                )
            }

            
    
        </div>
        </div>
        
        
    )
}


export default Login;
