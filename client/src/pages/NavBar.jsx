import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { removeAllFavourites } from '../features/favouriteSlice';
import { useNavigate, Link } from 'react-router-dom';
const getStorageTheme = () => {
  let theme = 'light-theme';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }
  return theme;
};

const NavBar = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [theme, setTheme] = useState(getStorageTheme());

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const user = useSelector((state) => state.user);
  const auth = user.currentUser?.result?._id;
  const photo = user.currentUser?.result?.photo;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignOut = () => {
    dispatch(logout());
    dispatch(removeAllFavourites());
    setOpenPopUp(false);
  };

  const PopUp = () => {
    setOpenPopUp(!openPopUp);
  };

  const [searchh, setSearchh] = useState('');

  const searchPostt = () => {
    if (searchh.trim()) {
      navigate(`/posts/search?searchQuery=${searchh}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPostt();
    }
  };
  console.log(photo);

  return (
    <nav>
      <div className="navbar">
        <div className="navbar-title">
          <div className="nav-title">
            <Link to="/" className="link">
              <i className="fab fa-pinterest"></i>
            </Link>
          </div>
        </div>
        <div className="navbar-search">
          <div>
            <input
              type="search"
              value={searchh}
              onChange={(e) => setSearchh(e.target.value)}
              placeholder="Search..."
              name={searchh}
              id="search"
              onKeyDown={handleKeyPress}
            />
            <i className="fa fa-search"></i>
          </div>
        </div>
        <div className="navbar-profile">
          {!openSearchBar && (
            <i
              id="mobile"
              className="fa fa-search"
              onClick={() => setOpenSearchBar(true)}
            ></i>
          )}

          {openSearchBar && (
            <div className="navbar-searchh">
              <div>
                <input
                  type="search"
                  value={searchh}
                  onChange={(e) => setSearchh(e.target.value)}
                  placeholder="Search..."
                  name={searchh}
                  id="search"
                  onKeyDown={handleKeyPress}
                />
                <i className="fa fa-search"></i>
              </div>
            </div>
          )}

          <i
            className={
              theme === 'light-theme' ? 'moon far fa-moon' : 'sun far fa-sun'
            }
            onClick={toggleTheme}
          ></i>
          {auth ? (
            <>
              {photo ? (
                <Link className="link" to="/created">
                  <img
                    src={photo}
                    className="nav-name"
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              ) : (
                <div className="nav-name">
                  <Link className="link" to="/created">
                    {user.currentUser?.result?.username?.charAt(0)}
                  </Link>
                </div>
              )}

              <i onClick={PopUp} className="fa fa-caret-down"></i>
              {openPopUp ? (
                <>
                  <div className="popUp" onClick={userSignOut}>
                    <ul>
                      <li>
                        <i className="far fa-sign-out-alt"></i>Sign out
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                ''
              )}
            </>
          ) : (
            <>
              <div className="navLogin">
                <Link className="link" to="/login">
                  Login
                </Link>
              </div>
              <div className="navRegister">
                <Link className="link" to="/register">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
