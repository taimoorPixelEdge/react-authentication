import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from "react-router-dom";
import "./form.css"

const Login = (props: { setName: (name: string) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        }).then(async (response)=> {
            console.log(response)
            if(response.status === 201){
              alert("You are successfully Logged In.")
              setRedirect(true);
              const content = await response.json();
             props.setName(content.name);
            
              
             
            }
            if(response.status === 400){
              alert("Invalid Credentials.")
            }
          });

        
    }

    if (redirect) {
        localStorage.setItem('refreshFlag', 'true');

        return <Redirect to="/"/>;
    }

    return (
        <div className="register-container">
        <form onSubmit={submit} className="register-form">
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="email" className="form-control" placeholder="Email address" required
                   onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}
            />

            <button  className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
        </div>
    );
};

export default Login;
