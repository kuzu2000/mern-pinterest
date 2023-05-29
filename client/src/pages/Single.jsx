import React, {useEffect, useState,useRef} from 'react';
import AddButton from './AddButton';
import { getPostDetails, addComment, addToFavourite } from '../features/api'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'
const Single = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const path = location.pathname.split('/')[2];
  const pin = useSelector((state) => state.pins.pin);

  const user = useSelector((state) => state.user);
  const auth = user.currentUser?.result?._id;
  const [liked, setLiked] = useState(user.currentUser?.result?.favourites?.includes(path));
  
  useEffect(() => {
    getPostDetails(dispatch, path);
  }, [dispatch, path]);


  useEffect(() => {
    setLiked(liked)
  }, [path])

  const clickHandler = () => {
    const variable = { postId: path }
    setLiked(prev => !prev)
    addToFavourite(dispatch, auth, variable)
  }

  const [Comments, setCommentS] = useState(pin?.comments)
  const [comments, setComments] = useState("")


  const back = () => {
    navigate(-1)
  }
  
  const handleSubmit = (e) => { 
    e.preventDefault()
    const value = {comment: comments}
    addComment(dispatch, path, value)
    setComments('')
    const element = document.getElementById('section-1');
     if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    setCommentS(pin?.comments);
  }, [pin?.comments]);

  return (
    <>
      <div className="backButton" onClick={back}>
          <i className="fa fa-arrow-left"></i>
      </div>

      <div className="singlePost">
        <div className="single">
          <div className="pic">
            <img src={pin?.photo} alt="" />
          </div>
          <div className="desc">
            <div onClick={clickHandler} className={liked ? "postSave Saved" : "postSave"}>{liked ? 'Saved' : 'Save'}</div>
            <div className="postAuthor">
              Uploaded by <span>{pin?.user?.username}</span>
            </div>
            <h1 className="postTitle">{pin?.title}</h1>
            <div className="postDesc">{pin?.desc}</div>
            <div className="commentSection">
              <h3>Comments</h3>
              <div className="comments">
               {Comments?.map((comment) => (
                 <div className="comment" key={comment?._id}><strong>{comment?.name?.username}</strong>: {comment.comment}</div>
               ))}
              <div id="section-1"></div>
              </div>
              <div className="postComment">
                <form onSubmit={handleSubmit}>
                  <textarea
                    placeholder="Add a comment"
                    name="comment"
                    onChange={e => setComments(e.target.value)} 
                    value={comments}
                    cols="30"
                  ></textarea>
                  <button type="submit">Done</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddButton />
    </>
  );
};

export default Single;
