import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchUser} from '../features/favouriteSlice'
import Favourite from './Favourite'
import UserPage from './UserPage';
const Favourites = () => {    
     const dispatch = useDispatch()
     
// const deleteSave = (id) => {
//   setPosts(Posts.filter((post) => post.postId !== id))
// }
const user = useSelector((state) => state.user);
const favourites = useSelector((state) => state.favourites.favourites);
 const auth = user.currentUser?.result._id;

    useEffect(() => {
        dispatch(fetchUser(auth))
    }, [dispatch, auth])



    return (
        <UserPage>
        <div className="container">
            {favourites.length > 0 ? (
                favourites.map((post, i) => {
                    return <Favourite key={i} post={post}/>
                })
                )  : (
                    <div className='no-items'>You haven't saved any items</div>
                ) } 
        </div>
            </UserPage>   
    );
}

export default Favourites;
