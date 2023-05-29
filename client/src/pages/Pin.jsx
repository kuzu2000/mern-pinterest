import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
// import { favourited, addToFavourite, removeFromFavourite } from '../actions/favourite';
import {useSelector, useDispatch} from 'react-redux'
import {addToFavourite} from '../features/api'
const Pin = ({post, ref}) => {
    const user = useSelector((state) => state.user);
    const auth = user.currentUser?.result?._id;
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch()
    const photo = post?.user?.photo

    useEffect(() => {
      setLiked(user.currentUser?.result?.favourites?.includes(post._id))
    }, [post._id])


    const clickHandler = () => {
      const variable = { postId: post._id }
      setLiked(prev => !prev)
      addToFavourite(dispatch, auth, variable)
    }
  
    // useEffect(() => {
    //   const variable = {
    //     userId: auth,
    //     postId: post._id,
    //   }
    //   dispatch(favourited(variable))
    // },[dispatch, post._id, post.photo, auth])
  
    // const clickHandler = () => {
    //   if(Favorited) {
    //     dispatch(removeFromFavourite(variable))
    //     setFavorited(!Favorited)
    //   } else {
    //     dispatch(addToFavourite(variable))
    //     setFavorited(!Favorited)
    //   }
    // }

    const downloadFile = (url) => {
      window.open(url);
      // or
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = 'myfile.pdf'; // replace with your file name
      // link.click();
    };


    return (
        <div className="box" ref={ref}>        
            <div className="image">
                <Link className='link' to={`/posts/${post._id}`}>
              <img className="image-size" src={post.photo} alt={post.title} />
              </Link>
              <div className="imgOpc">
                <div className="imageHeader">
                  <div className="imageSave" onClick={clickHandler}>{liked ? 'Saved' : 'Save'}</div>
                  </div>
                  <div className="imageFooter">
                    <i className="download fa fa-download" onClick={() => downloadFile(post.photo)}></i>
                     <i className="el fa fa-ellipsis-h"></i>
                  </div>
              </div>          
            </div>
            <div className="profile">
              {
                photo ? 
                (
                <img className="profileCircle" src={photo} style={{objectFit: 'cover'}} />
                ) : 
                (
              <div className="profileCircle">{post?.user?.username?.charAt(0)}</div>
                )
              }
              <h3>{post?.user?.username}</h3>
            </div>
          </div>
    );
}

export default Pin;
