import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchCreatedPosts} from '../features/favouriteSlice'
import Favourite from './Favourite'
import UserPage from './UserPage';
const Created = () => {    
     const dispatch = useDispatch()
     
// const deleteSave = (id) => {
//   setPosts(Posts.filter((post) => post.postId !== id))
// }
const favourites = useSelector((state) => state.favourites.createdPosts);
console.log(favourites)

    useEffect(() => {
        dispatch(fetchCreatedPosts())
    }, [dispatch])


     console.log(favourites)

    return (
        <UserPage>
        <div className="container">    
        {favourites.map((post, i) => {
              return <Favourite key={i} post={post}/>
            })}
        </div>
            </UserPage>   
    );
}

export default Created;
