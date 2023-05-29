import React, { useState } from 'react';
import { login } from './../features/api'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isError, isFetching, error, currentUser } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = { email, password };
    login(dispatch, form, navigate);
  };
  return (
    <>
      <div className="backButton">
        <i className="fa fa-arrow-left"></i>
      </div>

      <div className="loginForm">
        <i className="fa fa-pinterest"></i>
        <h1 className="welcome">Welcome to Pinterest Login</h1>
        {isError && <span className="errorBox">{JSON.stringify(error)}</span>}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
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
          {isFetching ? (
            <button type="submit" disabled={isFetching}>
              <i className="fa fa-spinner fa-spin"></i> Loading
            </button>
          ) : (
            <button type="submit" value="Login">Login</button>
          )}
        </form>
        {/* <div className="or">OR</div> */}
        {/* <div className="socialMedia">
          <div className="facebook">
            <i className="fab fa-facebook"></i>
            <div className="facebookContinue">Continue with Facebook</div>
          </div>
          <div className="google">
            <i className="fab fa-google"></i>
            <div className="googleContinue">Continue with Google</div>
          </div>
        </div> */}
        <div className="newUser">
          <Link className="link" to="/register">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
