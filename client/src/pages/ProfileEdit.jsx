import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../util/firebase';
import { updateAccount } from '../features/api'
const ProfileEdit = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.currentUser);
  const [username, setUsername] = useState(user?.result?.username);
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);

  const handleNameChange = (e) => {
    e.preventDefault();
    if(file){
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            const nameInput = { username: username || user?.result?.username, photo: url, password };
                if (nameInput) {
                  updateAccount(
                    dispatch,
                    user?.result?._id,
                    nameInput,
                  );
                }
        });
      }
    );
    } else {
      const nameInput = { username, password, photo: user?.result?.photo };
      if (nameInput) {
        updateAccount(
          dispatch,
          user?.result?._id,
          nameInput,
        );
    }
  }
}

console.log(user?.result?.photo)

  return (
    <section>
      <h1>Public profile</h1>
      <div className="profile-form">
        <form onSubmit={handleNameChange}>
          <div className="profile-text">
            {
              user?.result?.photo ?
              (<img className="profile-picture-edit" src={file ? URL.createObjectURL(file) : user?.result?.photo} alt={user?.result?.username} />) :
              (<div className='profile-picture-edit'>{user?.result?.username?.charAt(0)}</div>)
            }
            <label htmlFor="file"><i className="fa fa-image writeIcon"></i></label>
            <input type="file" name="photo" id="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="profile-text text">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={user?.result?.email} readOnly />
          </div>
          <div className="profile-text text">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="profile-text text">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="••••••••" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </section>
  );
};

export default ProfileEdit;
