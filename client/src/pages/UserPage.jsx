import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const UserPage = (props) => {
  const user = useSelector((state) => state.user.currentUser);
  const photo = user?.result?.photo;
  return (
    <main>
      <div className="profile">
        {photo ? (
          <img src={photo} style={{objectFit: 'cover'}} className="profile-name" />
        ) : (
          <div className="profile-name">{user?.result.username?.charAt(0)}</div>
        )}
        <div className="profile-full-name">{user?.result.username}</div>
        <div className="profile-email">@{user?.result.email.split('@')[0]}</div>
        <div className="profile-edit">
          <Link className="link" to="/profile-edit">
            Edit Profile
          </Link>
        </div>
      </div>
      <ul>
        <li>
          <NavLink
            to="/created"
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            Created
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved"
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            Saved
          </NavLink>
        </li>
      </ul>
      {props.children}
    </main>
  );
};

export default UserPage;
