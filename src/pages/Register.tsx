import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        
        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/login"/>;
    }

    const validatePassword = (value: any) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
      };

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <input
        className="form-control"
        placeholder="Name"
        required
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        className="form-control"
        placeholder="Email address"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className={`form-control ${validatePassword(password) ? '' : 'is-invalid'}`}
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      {!validatePassword(password) && (
        <div className="invalid-feedback">
          Password must be at least 8 characters long and contain at least 1 letter, 1 number, and 1 special character.
        </div>
      )}

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Submit
      </button>
    </form>
       
    );
};

export default Register;
