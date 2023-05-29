import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './../features/api';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {auth} from '../util/firebase'
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isError, isFetching, error, currentUser } = user;

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then((re) => {
      console.log(re)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = { username, email, password };
    if (password !== passwordConfirm) {
      alert('Password and confirm password are not match');
    } else {
      register(dispatch, form, navigate);
    }
  };
  return (
    <>
      <div className="backButton">
        <i className="fa fa-arrow-left"></i>
      </div>

      <div className="loginForm">
        <i className="fa fa-pinterest"></i>
        <h1 className="welcome">Welcome to Pinterest Register</h1>
        {isError && <span className="errorBox">{JSON.stringify(error)}</span>}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            type="text"
            name="username"
            id="username"
            value={username}
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder="Confirm Password"
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />

          {isFetching ? (
            <button type="submit" disabled={isFetching}>
              <i className="fa fa-spinner fa-spin"></i> Loading
            </button>
          ) : (
            <button type="submit" value="Register">Register</button>
          )}
        </form>
        {/* <div className="or">OR</div> */}
        {/* <div className="socialMedia">
          <div className="facebook">
            <i className="fab fa-facebook"></i>
            <div className="facebookContinue">Continue with Facebook</div>
          </div>
          <div className="google" onClick={signInGoogle}>
            <i className="fab fa-google"></i>
            <div className="googleContinue">Continue with Google</div>
          </div>
        </div> */}
        <div className="newUser">
          <Link className="link" to="/login">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
