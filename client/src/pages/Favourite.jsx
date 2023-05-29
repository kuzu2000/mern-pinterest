import React from 'react';
import { Link } from 'react-router-dom';
// import { removeFromFavourite } from '../actions/favourite';
import { useSelector, useDispatch } from 'react-redux';
const Favourite = ({ post, index }) => {
  const dispatch = useDispatch();
  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;
  // const removeFavourite = () => {
  //   const variable = {
  //     userId: userInfo?.result?._id,
  //     postId: post.postId,
  //   };
  //   dispatch(removeFromFavourite(variable));
  //   window.location.reload();
  // };
  return (
    <div className="box">
      <div className="image">
        <Link className="link" to={`/posts/${post._id}`}>
          <img src={post.photo} alt="" />
        </Link>
        <div className="imgOpc">
          <div className="imageHeader">
            <div className="imageSave">Unsave</div>
          </div>
          {/* <div className="imageFooter">
            <i className="download fa fa-trash"></i>
            <i className="el fa fa-ellipsis-h"></i>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Favourite;
