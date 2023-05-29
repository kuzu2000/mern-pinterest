import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../features/api';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../util/firebase';
const Edit = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            const newPost = {
              user: user.currentUser?.result?._id,
              title,
              desc,
              photo: url,
            };
            addPost(dispatch, newPost, navigate);
          })
          .catch((err) => {});
      }
    );
  };

  return (
    <>
      <div className="backButton">
        <Link className="link" to="/">
          <i className="fa fa-arrow-left"></i>
        </Link>
      </div>

      <div className="createPost">
        <div className="create">
          <form onSubmit={handleSubmit}>
            <div className="pic">
              {!file && (
                <>
                  <label htmlFor="fileInput">
                    <i className="fa fa-image writeIcon"></i>
                  </label>
                  <input
                    type="file"
                    name=""
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <p>
                    Recommendation: Use high-quality .jpg files less than 20MB
                  </p>
                </>
              )}
              {file && (
                <>
                  <img src={URL.createObjectURL(file)} alt="Demo" />
                  <div className="del-img" onClick={() => setFile(null)}>
                    <i className="fa fa-times"></i>
                  </div>
                </>
              )}
            </div>
            <div className="descr">
              <div className="inputAuthor">
                <div className="profileCircle">
                  {user.currentUser?.result?.username.charAt(0)}
                </div>
                <h3>{user.currentUser?.result?.username}</h3>
              </div>

              <input
                className="inputTitle"
                type="text"
                placeholder="Add Title"
                onChange={(e) => setTitle(e.target.value)}
                name=""
                id=""
              />
              <textarea
                className="inputDesc"
                name=""
                id=""
                placeholder="Add Description"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
              <button className="inputSubmit" type="submit">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
